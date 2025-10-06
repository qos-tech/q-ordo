import { hash } from 'bcrypt'
import {
  AuditAction,
  ContactType,
  prisma,
  ServiceStatus,
  Status,
} from '@repo/database'

import { BadRequestError } from '@/lib/errors/bad-request-error'
import { CreateClientBody, UpdateClientBody } from './client.schema'

/**
 * Handles the business logic for onboarding a new client company and its primary owner.
 * @param input - The validated data for the company and its owner.
 * @param actorId - The ID of the authenticated user (admin) performing the action.
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
    const newCompany = await tx.company.create({
      data: {
        name: company.name,
        taxId: company.taxId,
        createdById: actorId,
        updatedById: actorId,
      },
    })

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

  await prisma.auditLog.create({
    data: {
      action: AuditAction.CREATE,
      actorId,
      targetType: 'Company',
      targetId: result.companyId,
      details: {
        message: `Admin (ID: ${actorId}) created a new company "${company.name}" and owner user "${owner.name}".`,
      },
    },
  })

  return result
}

/**
 * Handles the business logic for updating an existing client company.
 * @param clientId - The ID of the company to update.
 * @param input - The validated data containing the fields to update.
 * @param actorId - The ID of the authenticated user (admin) performing the action.
 */
export async function updateClient(
  clientId: string,
  input: UpdateClientBody,
  actorId: string,
) {
  const { contacts, ...companyData } = input

  await prisma.$transaction(async (tx) => {
    await tx.company.update({
      where: { id: clientId },
      data: {
        ...companyData,
        updatedById: actorId,
      },
    })

    if (contacts) {
      const contactIdsToKeep: string[] = []

      for (const contact of contacts) {
        const upsertedContact = await tx.contact.upsert({
          where: { id: contact.id || '' },
          update: {
            type: contact.type,
            fullName: contact.fullName,
            email: contact.email,
            phone: contact.phone,
            isPrimary: contact.isPrimary,
            updatedById: actorId,
          },
          create: {
            companyId: clientId,
            type: contact.type,
            fullName: contact.fullName,
            email: contact.email,
            phone: contact.phone,
            isPrimary: contact.isPrimary,
            createdById: actorId,
            updatedById: actorId,
          },
        })
        contactIdsToKeep.push(upsertedContact.id)
      }

      await tx.contact.deleteMany({
        where: {
          companyId: clientId,
          id: { notIn: contactIdsToKeep },
        },
      })
    }
  })

  await prisma.auditLog.create({
    data: {
      action: AuditAction.UPDATE,
      actorId,
      targetType: 'Company',
      targetId: clientId,
      details: {
        message: `Admin (ID: ${actorId}) updated client (ID: ${clientId}).`,
        changes: input,
      },
    },
  })

  return getClientDetails(clientId)
}

/**
 * Handles the business logic for inactivating (soft deleting) a client company.
 * @param clientId - The ID of the company to inactivate.
 * @param actorId - The ID of the authenticated user (admin) performing the action.
 */
export async function deleteClient(clientId: string, actorId: string) {
  const company = await prisma.company.findUnique({
    where: { id: clientId },
  })

  if (!company) {
    throw new BadRequestError('Client not found.')
  }

  await prisma.$transaction(async (tx) => {
    await tx.company.update({
      where: { id: clientId },
      data: {
        status: Status.INACTIVE,
        updatedById: actorId,
      },
    })

    await tx.membership.updateMany({
      where: { companyId: clientId },
      data: {
        status: Status.INACTIVE,
      },
    })

    await tx.service.updateMany({
      where: {
        companyId: clientId,
        status: { in: [ServiceStatus.ACTIVE, ServiceStatus.PENDING] },
      },
      data: {
        status: ServiceStatus.CANCELLED,
        updatedById: actorId,
      },
    })
  })

  await prisma.auditLog.create({
    data: {
      action: AuditAction.DELETE,
      actorId,
      targetType: 'Company',
      targetId: clientId,
      details: {
        message: `Admin (ID: ${actorId}) inactivated client "${company.name}" (ID: ${clientId}).`,
      },
    },
  })

  return { message: 'Client inactivated successfully.' }
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

  return client
}
