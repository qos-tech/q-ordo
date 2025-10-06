import { z } from 'zod'
import { Status, ContactType } from '@repo/database'

// =================================================================
// INPUT SCHEMAS (Data that our API receives)
// =================================================================

// --- Schema for CREATION (POST /clients) ---

/**
 * Reusable schema for contact creation data.
 */
const contactCreateSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
})

/**
 * Schema for the entire body of the client onboarding request.
 */
export const createClientBodySchema = z
  .object({
    company: z.object({
      name: z.string().min(3).describe('The legal name of the company.'),
      taxId: z
        .string()
        .length(14)
        .describe('The company Tax ID (CNPJ in Brazil).'),
    }),
    owner: z.object({
      name: z
        .string()
        .min(3)
        .describe('The full name of the primary user/owner.'),
      email: z
        .string()
        .email()
        .describe('The primary user/owner email for login.'),
      phone: z
        .string()
        .optional()
        .describe('The primary user personal phone number.'),
      password: z
        .string()
        .min(8)
        .describe('The user password, at least 8 characters long.'),
    }),
    generalContact: contactCreateSchema,
    billingContactIsSameAsGeneral: z.boolean().default(false),
    billingContact: contactCreateSchema.optional(),
  })
  .refine(
    (data) => !(!data.billingContactIsSameAsGeneral && !data.billingContact),
    {
      message:
        'Billing contact is required when it is not the same as the general contact.',
      path: ['billingContact'],
    },
  )

// --- Schemas for READING (GET /clients) ---

/**
 * Schema for URL parameters when fetching a single client (e.g., /clients/:id).
 */
export const getClientParamsSchema = z.object({
  id: z.string().uuid('Invalid client ID format.'),
})

/**
 * Schema for query parameters for the client list endpoint (e.g., /clients?page=2&limit=10).
 */
export const getClientsQuerySchema = z.object({
  page: z.coerce
    .number()
    .min(1)
    .default(1)
    .describe('Page number for pagination.'),
  limit: z.coerce
    .number()
    .min(1)
    .max(100)
    .default(10)
    .describe('Number of items per page.'),
})

// --- SCHEMAS FOR UPDATE (PATCH /clients/:id) ---

/**
 * Schema for updating a single contact. The `id` is optional.
 * If an `id` is provided, it's an update. If not, it's a creation.
 */
const contactUpdateSchema = z.object({
  id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the contact to update. If omitted, a new contact will be created.',
    ),
  type: z.nativeEnum(ContactType),
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  isPrimary: z.boolean().optional(),
})

/**
 * Schema for the body of the client update request.
 * All fields are optional, allowing for partial updates.
 */
export const updateClientBodySchema = z.object({
  name: z.string().min(3).optional().describe("The company's new legal name."),
  status: z
    .nativeEnum(Status)
    .optional()
    .describe('The new status for the company.'),
  municipalRegistration: z.string().nullable().optional(),
  addressStreet: z.string().nullable().optional(),
  addressNumber: z.string().nullable().optional(),
  addressComplement: z.string().nullable().optional(),
  addressNeighborhood: z.string().nullable().optional(),
  addressCity: z.string().nullable().optional(),
  addressState: z.string().nullable().optional(),
  addressZipCode: z.string().nullable().optional(),
  contacts: z
    .array(contactUpdateSchema)
    .optional()
    .describe(
      'An array of contacts to create or update. Any existing contacts not included in this array will be deleted.',
    ),
})

// =================================================================
// OUTPUT SCHEMAS (Data that our API sends)
// =================================================================

export const createClientResponseSchema = z.object({
  companyId: z.string().uuid(),
  ownerId: z.string().uuid(),
})

const clientListItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  taxId: z.string(),
  status: z.nativeEnum(Status), // <-- REFINEMENT: Use nativeEnum for type safety
  createdAt: z.date(),
})

const contactResponseSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(ContactType), // <-- REFINEMENT: Use nativeEnum for type safety
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  isPrimary: z.boolean(),
})

export const getClientResponseSchema = z.object({
  client: clientListItemSchema.extend({
    municipalRegistration: z.string().nullable(),
    addressStreet: z.string().nullable(),
    addressNumber: z.string().nullable(),
    addressComplement: z.string().nullable(),
    addressNeighborhood: z.string().nullable(),
    addressCity: z.string().nullable(),
    addressState: z.string().nullable(),
    addressZipCode: z.string().nullable(),
    contacts: z.array(contactResponseSchema),
  }),
})

export const getClientsResponseSchema = z.object({
  clients: z.array(clientListItemSchema),
})

/**
 * We can reuse the getClientResponseSchema for the successful response of an update,
 * as it already contains all the detailed client information.
 */
export const updateClientResponseSchema = getClientResponseSchema

// =================================================================
// TYPESCRIPT TYPES (Types for our application code)
// =================================================================

export type CreateClientBody = z.infer<typeof createClientBodySchema>
export type GetClientParams = z.infer<typeof getClientParamsSchema>
export type GetClientsQuery = z.infer<typeof getClientsQuerySchema>
export type UpdateClientBody = z.infer<typeof updateClientBodySchema>
