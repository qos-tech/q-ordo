import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createClientHandler } from './client.controller'
import { createClientSchema, clientResponseSchema } from './client.schema'

export async function clientRoutes(server: FastifyInstance) {
  const serverWithProvider = server.withTypeProvider<ZodTypeProvider>()

  serverWithProvider.post(
    '/',
    {
      onRequest: [server.authenticate],
      schema: {
        summary: 'Create a new client',
        description:
          'Creates a new client company and its primary owner user. This route is protected and requires authentication.',
        tags: ['Clients'],
        security: [{ bearerAuth: [] }],
        body: createClientSchema,
        response: {
          201: clientResponseSchema,
          400: z.object({ message: z.string() }),
          401: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
        },
      },
    },
    createClientHandler,
  )
}
