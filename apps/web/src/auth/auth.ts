'use server'
import { getProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  return !!(await cookies()).get('q-ordo.token')?.value
}

export async function auth() {
  const token = (await cookies()).get('q-ordo.token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (error) {
    ;(await cookies()).delete('q-ordo.token')
  }

  redirect('/api/auth/sign-out')
}
