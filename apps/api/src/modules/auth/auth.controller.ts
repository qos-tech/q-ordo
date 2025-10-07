// apps/api/src/modules/auth/auth.controller.ts

import { FastifyReply, FastifyRequest } from 'fastify'
import { AuditAction, CompanyRole, prisma, SystemRole } from '@repo/database'

import { BadRequestError } from '@/lib/errors/bad-request-error'
import { UnauthorizedError } from '@/lib/errors/unauthorized-error'

import * as authService from './auth.service'
import { SignUpBody, LoginBody } from './auth.schema'

/**
 * Handles the HTTP request for public user and company signup.
 */
export async function signUpHandler(
  request: FastifyRequest<{ Body: SignUpBody }>,
  reply: FastifyReply,
) {
  try {
    await authService.signUp(request.body)
    return reply
      .status(201)
      .send({ message: 'User and company created successfully.' })
  } catch (error) {
    if (error instanceof BadRequestError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}

/**
 * Handles the HTTP request for user login.
 */
export async function loginHandler(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  try {
    const user = await authService.login(request.body)

    const membership = await prisma.membership.findFirst({
      where: { userId: user.id },
      select: { companyId: true, role: true },
    })

    // --- LÓGICA DE PERMISSÃO REFINADA ---
    let role: CompanyRole | SystemRole
    let companyId: string | undefined

    if (user.systemRole) {
      // Se o utilizador tem um papel de sistema, esse é o seu papel principal.
      role = user.systemRole
      companyId = membership?.companyId // Ele pode estar a "observar" uma empresa
    } else if (membership) {
      // Se não, ele deve ser um utilizador de cliente com uma associação ativa.
      role = membership.role
      companyId = membership.companyId
    } else {
      // Se não for nem um, nem outro, o utilizador está num estado inválido.
      throw new UnauthorizedError('User has no assigned role or membership.')
    }
    // ------------------------------------

    await prisma.auditLog.create({
      data: {
        action: AuditAction.LOGIN_SUCCESS,
        actorId: user.id,
        targetType: 'User',
        targetId: user.id,
      },
    })

    const token = await reply.jwtSign({
      sub: user.id,
      companyId,
      role,
    })

    return reply.status(200).send({ token })
  } catch (error) {
    await prisma.auditLog.create({
      data: {
        action: AuditAction.LOGIN_FAILURE,
        targetType: 'User',
        details: {
          attemptedEmail: (request.body as LoginBody).email,
          reason: 'Invalid credentials or authorization issue',
        },
      },
    })

    if (error instanceof Error && error.message.includes('credentials')) {
      return reply.status(401).send({ message: 'Invalid credentials.' })
    }
    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: error.message })
    }

    throw error
  }
}
