import { SystemRole } from '@repo/database'
import { z } from 'zod'

// =================================================================
// INPUT SCHEMAS (Data that our API receives)
// =================================================================

/**
 * Schema for the public signup endpoint (POST /auth/signup).
 */
export const signUpBodySchema = z
  .object({
    company: z.object({
      name: z.string().min(3).describe('The legal name of the company.'),
      taxId: z
        .string()
        .length(14)
        .describe('The company Tax ID (CNPJ in Brazil).'),
      municipalRegistration: z
        .string()
        .optional()
        .describe('The optional Municipal Registration ID.'),
    }),
    user: z.object({
      name: z
        .string()
        .min(3)
        .describe('The full name of the primary user/owner.'),
      email: z
        .string()
        .email()
        .describe('The primary user/owner email, used for login.'),
      phone: z
        .string()
        .optional()
        .describe('The primary user personal phone number.'),
      password: z
        .string()
        .min(8)
        .describe('The user password, at least 8 characters long.'),
    }),
    generalContact: z.object({
      fullName: z.string().min(3).describe("The contact's full name."),
      email: z.string().email().describe("The contact's email address."),
      phone: z.string().optional().describe("The contact's phone number."),
    }),
    billingContactIsSameAsGeneral: z.boolean().default(false),
    billingContact: z
      .object({
        fullName: z.string().min(3).describe("The contact's full name."),
        email: z.string().email().describe("The contact's email address."),
        phone: z.string().optional().describe("The contact's phone number."),
      })
      .optional(),
    termsOfServiceAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Terms of Service.',
    }),
    privacyPolicyAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Privacy Policy.',
    }),
  })
  .refine(
    (data) => !(!data.billingContactIsSameAsGeneral && !data.billingContact),
    {
      message:
        'Billing contact is required when it is not the same as the general contact.',
      path: ['billingContact'],
    },
  )

/**
 * Schema for the login endpoint (POST /auth/login).
 */
export const loginBodySchema = z.object({
  email: z.string().email().describe('The registered user email.'),
  password: z.string().min(1).describe('The user password.'),
})

// =================================================================
// OUTPUT SCHEMAS (Data that our API sends)
// =================================================================

export const signUpResponseSchema = z.object({
  message: z.string(),
})

export const loginResponseSchema = z.object({
  token: z.string().describe('The JWT token for authentication.'),
})

/**
 * Schema for the successful response of the get authenticated profile endpoint.
 */
export const getProfileResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string().nullable(),
    systemRole: z.nativeEnum(SystemRole).nullable(),
  }),
})

// =================================================================
// TYPESCRIPT TYPES (Types for our application code)
// =================================================================

export type SignUpBody = z.infer<typeof signUpBodySchema>
export type LoginBody = z.infer<typeof loginBodySchema>
