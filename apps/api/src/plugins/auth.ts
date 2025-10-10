import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import { UnauthorizedError } from '@/lib/errors/unauthorized-error'

export const authPlugin = fp(async function (app: FastifyInstance) {
  app.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify()
      } catch (error) {
        throw new UnauthorizedError('Invalid or expired token.')
      }
    },
  )
})
