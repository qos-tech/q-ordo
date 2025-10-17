'use server'
import { getProfile } from '@/http/get-profile'
import type { User } from '@repo/database'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type AuthenticatedUser = Omit<User, 'passwordHash'>

export async function isAuthenticated() {
  return !!(await cookies()).get('q-ordo.token')?.value
}

export async function auth(): Promise<{ user: AuthenticatedUser }> {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  const token = (await cookies()).get('q-ordo.token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 401) {
      ;(await cookies()).delete('q-ordo.token')
      redirect('/auth/sign-in')
    }

    console.error('An unexpected error occurred during authentication:', error)
    throw error
  }
}
