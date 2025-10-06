import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import {
  createClientHandler,
  getClientDetailsHandler,
  getClientsHandler,
  updateClientHandler,
} from './client.controller'
import {
  createClientBodySchema,
  createClientResponseSchema,
  getClientParamsSchema,
  getClientResponseSchema,
  getClientsQuerySchema,
  getClientsResponseSchema,
  updateClientBodySchema,
  updateClientResponseSchema,
} from './client.schema'

/**
 * Defines all the routes for the client module.
 * @param server - The Fastify server instance.
 */
export async function clientRoutes(server: FastifyInstance) {
  const serverWithProvider = server.withTypeProvider<ZodTypeProvider>()

  /**
   * Route to CREATE a new client.
   * Protected and accessible only by authenticated system users.
   */
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
        body: createClientBodySchema,
        response: {
          201: createClientResponseSchema,
          400: z.object({ message: z.string() }), // Validation error
          403: z.object({ message: z.string() }), // Authorization error
          409: z.object({ message: z.string() }), // Conflict error (data already exists)
        },
      },
    },
    createClientHandler,
  )

  /**
   * Route to UPDATE an existing client.
   * Protected and accessible only by authenticated system users.
   */
  serverWithProvider.patch(
    '/:id',
    {
      onRequest: [server.authenticate],
      schema: {
        summary: 'Update a client',
        tags: ['Clients'],
        security: [{ bearerAuth: [] }],
        params: getClientParamsSchema,
        body: updateClientBodySchema,
        response: {
          200: updateClientResponseSchema,
          403: z.object({ message: z.string() }), // Authorization error
          404: z.object({ message: z.string() }), // Not Found error
        },
      },
    },
    updateClientHandler,
  )

  /**
   * Route to LIST all clients with pagination.
   * Protected and accessible only by authenticated system users.
   */
  serverWithProvider.get(
    '/',
    {
      onRequest: [server.authenticate],
      schema: {
        summary: 'List all clients',
        tags: ['Clients'],
        security: [{ bearerAuth: [] }],
        querystring: getClientsQuerySchema,
        response: {
          200: getClientsResponseSchema,
          403: z.object({ message: z.string() }),
        },
      },
    },
    getClientsHandler,
  )

  /**
   * Route to GET the details of a specific client.
   * Protected and accessible only by authenticated system users.
   */
  serverWithProvider.get(
    '/:id',
    {
      onRequest: [server.authenticate],
      schema: {
        summary: 'Get client details',
        tags: ['Clients'],
        security: [{ bearerAuth: [] }],
        params: getClientParamsSchema,
        response: {
          200: getClientResponseSchema,
          403: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }), // Not Found error
        },
      },
    },
    getClientDetailsHandler,
  )
}
