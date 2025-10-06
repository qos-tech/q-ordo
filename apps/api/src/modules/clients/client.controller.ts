import { FastifyReply, FastifyRequest } from 'fastify'
import { SystemRole } from '@repo/database'

import { BadRequestError } from '@/lib/errors/bad-request-error'
import { UnauthorizedError } from '@/lib/errors/unauthorized-error'
import {
  createClient,
  getClientDetails,
  getClients,
  updateClient,
} from './client.service'
import {
  CreateClientBody,
  GetClientParams,
  GetClientsQuery,
  UpdateClientBody,
} from './client.schema'

/**
 * A helper function to ensure that the authenticated user is a system-level user.
 * Throws an UnauthorizedError if the user does not have a system role.
 * @param request - The Fastify request object, containing the authenticated user from the JWT.
 */
function ensureSystemUser(request: FastifyRequest) {
  const isSystemUser = Object.values(SystemRole).includes(
    request.user.role as SystemRole,
  )
  if (!isSystemUser) {
    throw new UnauthorizedError(
      'You are not authorized to perform this action.',
    )
  }
}

/**
 * Handles the HTTP request to create a new client company and its primary owner.
 */
export async function createClientHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    ensureSystemUser(request)
    const actorId = request.user.sub

    const result = await createClient(request.body as CreateClientBody, actorId)

    return reply.status(201).send(result)
  } catch (error) {
    if (error instanceof BadRequestError) {
      return reply.status(409).send({ message: error.message })
    }
    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: error.message })
    }
    throw error
  }
}

/**
 * Handles the HTTP request to update an existing client's data.
 */
export async function updateClientHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    ensureSystemUser(request)
    const actorId = request.user.sub
    const { id } = request.params as GetClientParams
    const body = request.body as UpdateClientBody

    const updatedClient = await updateClient(id, body, actorId)

    return reply.status(200).send({ client: updatedClient })
  } catch (error) {
    if (error instanceof BadRequestError) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: error.message })
    }
    throw error
  }
}

/**
 * Handles the HTTP request to fetch a paginated list of clients.
 */
export async function getClientsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    ensureSystemUser(request)

    const { page, limit } = request.query as GetClientsQuery
    const { clients, total } = await getClients(page, limit)

    // Add pagination info to the response headers for a better API experience.
    reply.header('x-total-count', String(total))
    reply.header('x-per-page', String(limit))
    reply.header('x-current-page', String(page))

    return reply.status(200).send({ clients })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: error.message })
    }
    throw error
  }
}

/**
 * Handles the HTTP request to fetch the details of a single client.
 */
export async function getClientDetailsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    ensureSystemUser(request)

    const { id } = request.params as GetClientParams
    const client = await getClientDetails(id)

    return reply.status(200).send({ client })
  } catch (error) {
    if (error instanceof BadRequestError) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: error.message })
    }
    throw error
  }
}
