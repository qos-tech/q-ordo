import { env } from '@repo/env'
import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequestError } from '@/lib/errors/bad-request-error'
import { UnauthorizedError } from '@/lib/errors/unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  reply.log.error(error)

  if (env.NODE_ENV !== 'development') {
    return reply.status(500).send({ message: 'Internal server error.' })
  }

  return reply.status(500).send({
    message: 'Internal server error.',
    error: error.message,
    stack: error.stack,
  })
}
