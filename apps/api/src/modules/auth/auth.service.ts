import { hash, compare } from 'bcrypt'
import { AuditAction, ContactType, prisma } from '@repo/database'

import { BadRequestError } from '@/lib/errors/bad-request-error'
import { SignUpBody, LoginBody } from './auth.schema'

/**
 * Handles the business logic for the public signup of a new company and its owner.
 * @param input - The validated data from the signup form.
 */
export async function signUp(input: SignUpBody) {
  const {
    company,
    user: owner,
    generalContact,
    billingContactIsSameAsGeneral,
    billingContact,
  } = input

  const [existingCompany, existingUser] = await Promise.all([
    prisma.company.findUnique({ where: { taxId: company.taxId } }),
    prisma.user.findUnique({ where: { email: owner.email } }),
  ])

  if (existingCompany) {
    throw new BadRequestError('A company with this Tax ID already exists.')
  }
  if (existingUser) {
    throw new BadRequestError('A user with this email already exists.')
  }

  const passwordHash = await hash(owner.password, 10)

  const { newCompany, newUser } = await prisma.$transaction(async (tx) => {
    const companyResult = await tx.company.create({
      data: {
        name: company.name,
        taxId: company.taxId,
        municipalRegistration: company.municipalRegistration,
      },
    })

    const userResult = await tx.user.create({
      data: {
        name: owner.name,
        email: owner.email,
        phone: owner.phone,
        passwordHash,
      },
    })

    await tx.membership.create({
      data: {
        companyId: companyResult.id,
        userId: userResult.id,
        role: 'OWNER',
      },
    })

    await tx.contact.create({
      data: {
        companyId: companyResult.id,
        type: ContactType.GENERAL,
        isPrimary: true,
        fullName: generalContact.fullName,
        email: generalContact.email,
        phone: generalContact.phone,
      },
    })

    const billingContactData = billingContactIsSameAsGeneral
      ? generalContact
      : billingContact!

    await tx.contact.create({
      data: {
        companyId: companyResult.id,
        type: ContactType.BILLING,
        isPrimary: true,
        fullName: billingContactData.fullName,
        email: billingContactData.email,
        phone: billingContactData.phone,
      },
    })

    return { newCompany: companyResult, newUser: userResult }
  })

  // Create an explicit audit log for the signup action.
  await prisma.auditLog.create({
    data: {
      action: AuditAction.CREATE,
      actorId: newUser.id, // The actor is the user who just signed up.
      targetType: 'Company',
      targetId: newCompany.id,
      details: {
        message: `New company "${newCompany.name}" signed up. Owner: "${newUser.name}".`,
      },
    },
  })
}

/**
 * Handles the business logic for user login.
 * @param input - The validated login data (email and password).
 * @returns The authenticated user object (without password hash).
 */
export async function login(input: LoginBody) {
  const { email, password } = input

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !user.passwordHash) {
    throw new Error('Invalid credentials.')
  }

  const isPasswordValid = await compare(password, user.passwordHash)

  if (!isPasswordValid) {
    throw new Error('Invalid credentials.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

/**
 * Fetches the profile of the currently authenticated user.
 * @param userId - The ID of the user (from the JWT subject).
 * @returns The user's profile information.
 * @throws An error if the user is not found.
 */
export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    // Selecionamos apenas os campos que queremos expor, excluindo o passwordHash.
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      systemRole: true,
    },
  })

  if (!user) {
    throw new Error('User not found.')
  }

  return user
}
