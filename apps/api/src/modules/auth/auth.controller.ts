// apps/api/src/modules/auth/auth.controller.ts

import { FastifyReply, FastifyRequest } from 'fastify'
import { AuditAction, CompanyRole, prisma, SystemRole } from '@repo/database'

import { BadRequestError } from '@/lib/errors/bad-request-error'
import { UnauthorizedError } from '@/lib/errors/unauthorized-error'

import * as authService from './auth.service'
import { SignUpBody, LoginBody } from './auth.schema'

export async function signUpHandler(
  request: FastifyRequest<{ Body: SignUpBody }>,
  reply: FastifyReply,
) {
  try {
    // Para o signup, o "ator" é o próprio usuário que está a ser criado,
    // então a auditoria principal é feita no serviço.
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

    let role: CompanyRole | SystemRole
    let companyId: string | undefined

    if (user.systemRole) {
      role = user.systemRole
      companyId = membership?.companyId
    } else if (membership) {
      role = membership.role
      companyId = membership.companyId
    } else {
      throw new UnauthorizedError('User has no assigned role or membership.')
    }

    // Registra o login bem-sucedido com o endereço IP.
    await prisma.auditLog.create({
      data: {
        action: AuditAction.LOGIN_SUCCESS,
        actorId: user.id,
        targetType: 'User',
        targetId: user.id,
        ipAddress: request.ip, // <-- CAPTURANDO O IP
      },
    })

    const token = await reply.jwtSign({
      sub: user.id,
      companyId,
      role,
    })

    return reply.status(200).send({ token })
  } catch (error) {
    // Registra a tentativa de login falhada com o endereço IP.
    await prisma.auditLog.create({
      data: {
        action: AuditAction.LOGIN_FAILURE,
        targetType: 'User',
        ipAddress: request.ip, // <-- CAPTURANDO O IP
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

/**
 * Handles the request to get the authenticated user's profile.
 */
export async function getProfileHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // O nosso plugin de autenticação garante que `request.user.sub` existe.
    const userId = request.user.sub
    const userProfile = await authService.getProfile(userId)

    return reply.status(200).send({ user: userProfile })
  } catch (error) {
    // Este erro só aconteceria se o usuário fosse apagado DEPOIS de o token ser gerado.
    if (error instanceof Error) {
      return reply.status(404).send({ message: 'User not found.' })
    }
    throw error
  }
}
