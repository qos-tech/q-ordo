import { hash } from 'bcryptjs'
import { ContactType, prisma } from '@repo/database'

import { BadRequestError } from '@/lib/errors/bad-request-error'
import { CreateClientInput } from './client.schema'

export async function createClient(input: CreateClientInput, actorId: string) {
  const {
    company,
    owner,
    generalContact,
    billingContactIsSameAsGeneral,
    billingContact,
  } = input

  const [existingCompany, existingUser] = await Promise.all([
    prisma.company.findUnique({ where: { taxId: company.taxId } }),
    prisma.user.findUnique({ where: { email: owner.email } }),
  ])

  if (existingCompany) {
    throw new BadRequestError('Company with this Tax ID already exists.')
  }
  if (existingUser) {
    throw new BadRequestError('User with this email already exists.')
  }

  const passwordHash = await hash(owner.password, 10)

  const result = await prisma.$transaction(async (tx) => {
    const newCompany = await tx.company.create({
      data: {
        name: company.name,
        taxId: company.taxId,
        createdById: actorId,
        updatedById: actorId,
      },
    })

    const newUser = await tx.user.create({
      data: { name: owner.name, email: owner.email, passwordHash },
    })

    await tx.membership.create({
      data: { companyId: newCompany.id, userId: newUser.id, role: 'OWNER' },
    })

    await tx.contact.create({
      data: {
        companyId: newCompany.id,
        type: ContactType.GENERAL,
        isPrimary: true,
        fullName: generalContact.fullName,
        email: generalContact.email,
        phone: generalContact.phone,
        createdById: actorId,
        updatedById: actorId,
      },
    })

    const billingContactData = billingContactIsSameAsGeneral
      ? generalContact
      : billingContact!

    await tx.contact.create({
      data: {
        companyId: newCompany.id,
        type: ContactType.BILLING,
        isPrimary: true,
        fullName: billingContactData.fullName,
        email: billingContactData.email,
        phone: billingContactData.phone,
        createdById: actorId,
        updatedById: actorId,
      },
    })

    return { companyId: newCompany.id, ownerId: newUser.id }
  })

  return result
}
