import { FastifyReply, FastifyRequest } from 'fastify'
import '@fastify/jwt'
import { CompanyRole, SystemRole } from '@repo/database'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: {
      sub: string
      role: CompanyRole | SystemRole
      companyId?: string
    }
    user: {
      sub: string
      role: CompanyRole | SystemRole
      companyId?: string
    }
  }
}

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>
  }
}
