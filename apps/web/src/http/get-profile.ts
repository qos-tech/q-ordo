import { api } from '@/http/api-client'
import type { User } from '@repo/database'

type AuthenticatedUser = Omit<User, 'passwordHash'>

interface GetProfileResponse {
  user: AuthenticatedUser
}

export async function getProfile() {
  const { user } = await api.get('auth/profile').json<GetProfileResponse>()

  return { user }
}
