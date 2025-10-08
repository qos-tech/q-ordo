import ky from 'ky'
import { env } from '@repo/env'

/**
 * A centralized API client instance using `ky`.
 * This instance is pre-configured with the base URL of our backend API.
 *
 * In the future, this is where we will add interceptors (hooks) to automatically
 * attach the authentication token to outgoing requests.
 */
export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
})
