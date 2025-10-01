import { build } from '@/app'
import { env } from '@repo/env'

async function start() {
  const app = await build()

  try {
    await app.listen({ port: env.SERVER_PORT, host: '0.0.0.0' })
    app.log.info(
      `🚀 HTTP server running on http://localhost:${env.SERVER_PORT}`,
    )
    app.log.info(
      `📄 API docs running on http://localhost:${env.SERVER_PORT}/docs`,
    )
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
