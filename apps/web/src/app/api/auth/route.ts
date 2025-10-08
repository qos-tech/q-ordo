import { NextRequest, NextResponse } from 'next/server'

/**
 * This API Route has a single responsibility: to receive a JWT from the client-side
 * and set it as a secure, httpOnly cookie.
 * @param request - The incoming Next.js request object.
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { message: 'Token is missing.' },
        { status: 400 },
      )
    }

    // The token will be stored in a cookie named 'q-ordo.token'
    const cookieExpiresInSeconds = 60 * 60 * 24 * 7 // 7 days

    const response = NextResponse.json({ message: 'Token set successfully.' })

    // Set the secure, httpOnly cookie on the response.
    response.cookies.set({
      name: 'q-ordo.token',
      value: token,
      path: '/',
      maxAge: cookieExpiresInSeconds,
      httpOnly: true,
      sameSite: 'strict',
      // In production, you should also add the 'secure: true' flag.
      // secure: process.env.NODE_ENV === 'production',
    })

    return response
  } catch (error) {
    console.error('Failed to set auth cookie:', error)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 },
    )
  }
}
