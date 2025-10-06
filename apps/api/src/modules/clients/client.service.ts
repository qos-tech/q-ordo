import { hash } from 'bcrypt'
import { AuditAction, ContactType, prisma } from '@repo/database'

import { BadRequestError } from '@/lib/errors/bad-request-error'
import { CreateClientBody } from './client.schema'

/**
 * Handles the business logic for onboarding a new client company and its primary owner.
 * This function is framework-agnostic and focuses purely on business rules.
 *
 * @param input - The validated data for the company and its owner.
 * @param actorId - The ID of the authenticated user (admin) performing the action, for audit purposes.
 */
export async function createClient(input: CreateClientBody, actorId: string) {
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
    // 1. Create the Company with audit data.
    const newCompany = await tx.company.create({
      data: {
        name: company.name,
        taxId: company.taxId,
        createdById: actorId,
        updatedById: actorId,
      },
    })

    // 2. Create the User with audit data.
    const newUser = await tx.user.create({
      data: {
        name: owner.name,
        email: owner.email,
        phone: owner.phone,
        passwordHash,
        createdById: actorId,
        updatedById: actorId,
      },
    })

    // 3. Create the Membership link with the OWNER role.
    await tx.membership.create({
      data: {
        companyId: newCompany.id,
        userId: newUser.id,
        role: 'OWNER',
      },
    })

    // 4. Create the primary General Contact.
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

    // 5. Determine the data for and create the primary Billing Contact.
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

  // --- NOVA LÓGICA DE AUDITORIA EXPLÍCITA ---
  // 6. Após o sucesso da transação, criamos um registro explícito no AuditLog.
  await prisma.auditLog.create({
    data: {
      action: AuditAction.CREATE,
      actorId,
      targetType: 'Company', // A entidade principal da ação.
      targetId: result.companyId,
      details: {
        message: `Admin (ID: ${actorId}) created a new company "${company.name}" and owner user "${owner.name}".`,
        createdUserId: result.ownerId,
      },
    },
  })

  return result
}

/**
 * Fetches a paginated list of all client companies.
 */
export async function getClients(page: number, limit: number) {
  const [clients, total] = await prisma.$transaction([
    prisma.company.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        taxId: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.company.count(),
  ])

  return { clients, total }
}

/**
 * Fetches the detailed profile of a single client company by its ID.
 */
export async function getClientDetails(clientId: string) {
  const client = await prisma.company.findUnique({
    where: {
      id: clientId,
    },
    select: {
      id: true,
      name: true,
      taxId: true,
      status: true,
      municipalRegistration: true,
      addressStreet: true,
      addressNumber: true,
      addressComplement: true,
      addressNeighborhood: true,
      addressCity: true,
      addressState: true,
      addressZipCode: true,
      createdAt: true,
      contacts: {
        select: {
          id: true,
          type: true,
          fullName: true,
          email: true,
          phone: true,
          isPrimary: true,
        },
      },
    },
  })

  if (!client) {
    throw new BadRequestError('Client not found.')
  }

  // Futuramente, adicionaremos um AuditLog para a ação de VISUALIZAÇÃO aqui.
  // await prisma.auditLog.create({ data: { action: AuditAction.VIEW, ... } })

  return client
}
