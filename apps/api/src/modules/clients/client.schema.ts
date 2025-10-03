import { z } from 'zod'

const contactSchema = z.object({
  fullName: z.string().min(3, { message: 'Contact name is required.' }),
  email: z.string().email({ message: 'Invalid contact email format.' }),
  phone: z.string().optional(),
})

export const createClientSchema = z
  .object({
    company: z.object({
      name: z.string().min(3, { message: 'Company name is required.' }),
      taxId: z
        .string()
        .length(14, { message: 'Tax ID must contain 14 digits.' }),
    }),

    owner: z.object({
      name: z.string().min(3, { message: 'Owner name is required.' }),
      email: z.string().email({ message: 'Invalid email format.' }),
      phone: z.string().optional(),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long.' }),
    }),

    generalContact: contactSchema,
    billingContactIsSameAsGeneral: z.boolean().default(false),
    billingContact: contactSchema.optional(),
  })
  .refine(
    (data) => {
      if (!data.billingContactIsSameAsGeneral && !data.billingContact) {
        return false
      }
      return true
    },
    {
      message:
        'Billing contact is required when it is not the same as the general contact.',
      path: ['billingContact'],
    },
  )

export const clientResponseSchema = z.object({
  companyId: z.string().cuid(),
  ownerId: z.string().cuid(),
})

export type CreateClientInput = z.infer<typeof createClientSchema>
