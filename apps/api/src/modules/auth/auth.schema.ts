import { z } from 'zod'
import { SystemRole } from '@repo/database'

export const getProfileResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string().nullable(),
    systemRole: z.nativeEnum(SystemRole).nullable(),
  }),
})
