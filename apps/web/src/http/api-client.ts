import { env } from '@repo/env'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      async (request) => {
        if (typeof window === 'undefined') {
          const { cookies } = await import('next/headers')
          const token = (await cookies()).get('q-ordo.token')?.value

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        }
      },
    ],
  },
})
