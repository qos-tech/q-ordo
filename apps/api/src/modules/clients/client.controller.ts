import { FastifyReply, FastifyRequest } from 'fastify'

import { BadRequestError } from '@/lib/errors/bad-request-error'
import { createClient } from './client.service'
import { CreateClientInput } from './client.schema'

export async function createClientHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const actorId = request.user.sub

    const result = await createClient(
      request.body as CreateClientInput,
      actorId,
    )

    return reply.status(201).send(result)
  } catch (error) {
    if (error instanceof BadRequestError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
