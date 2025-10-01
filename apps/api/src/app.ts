import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import { env } from '@repo/env'
import { errorHandler } from '@/error-handler.js'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'

const loggerConfig =
  env.NODE_ENV === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      }
    : true

export async function build() {
  const app = fastify({
    logger: loggerConfig,
  }).withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.setErrorHandler(errorHandler)

  if (env.NODE_ENV !== 'production') {
    app.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Q-Ordo API',
          description: 'API for the Q-Ordo billing system.',
          version: '1.0.0',
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
      transform: jsonSchemaTransform,
    })

    app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
    })
  }

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  })

  app.register(fastifyCors, { origin: env.CORS_ORIGIN })

  return app
}
