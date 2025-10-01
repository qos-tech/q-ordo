import type { FastifyReply, FastifyRequest } from 'fastify'
import * as authService from './auth.service'

export async function getProfileHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userId = request.user.sub
    const userProfile = await authService.getProfile(userId)

    return reply.status(200).send({ user: userProfile })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ message: 'User not found.' })
    }
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
