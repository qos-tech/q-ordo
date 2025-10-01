import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import * as authController from './auth.controller'
import { getProfileResponseSchema } from './auth.schema'

export async function authRoutes(server: FastifyInstance) {
  const serverWithProvider = server.withTypeProvider<ZodTypeProvider>()

  serverWithProvider.get(
    '/me',
    {
      onRequest: [server.authenticate],
      schema: {
        summary: "Get authenticated user's profile.",
        tags: ['Auth'],
        security: [{ bearerAuth: [] }],
        response: {
          200: getProfileResponseSchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
    authController.getProfileHandler,
  )
}
