import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { signUpHandler, loginHandler } from './auth.controller'
import {
  signUpBodySchema,
  signUpResponseSchema,
  loginBodySchema,
  loginResponseSchema,
} from './auth.schema'

/**
 * Defines all the public routes for the authentication module.
 * @param server - The Fastify server instance.
 */
export async function authRoutes(server: FastifyInstance) {
  const serverWithProvider = server.withTypeProvider<ZodTypeProvider>()

  /**
   * Route to SIGN UP a new company and its owner.
   * This is a public endpoint.
   */
  serverWithProvider.post(
    '/signup',
    {
      schema: {
        summary: 'Sign up a new company and its owner',
        tags: ['Auth'],
        body: signUpBodySchema,
        response: {
          201: signUpResponseSchema,
          409: z.object({ message: z.string() }), // Conflict error
        },
      },
    },
    signUpHandler,
  )

  /**
   * Route to LOG IN a user.
   * This is a public endpoint that returns a JWT upon success.
   */
  serverWithProvider.post(
    '/login',
    {
      schema: {
        summary: 'Authenticate a user and get a JWT token',
        tags: ['Auth'],
        body: loginBodySchema,
        response: {
          200: loginResponseSchema,
          401: z.object({ message: z.string() }), // Unauthorized error
          403: z.object({ message: z.string() }), // Forbidden error
        },
      },
    },
    loginHandler,
  )
}
