import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * The name of our authentication cookie.
 */
const AUTH_COOKIE_NAME = 'q-ordo.token'

/**
 * An array of public routes that do not require authentication.
 * These are the final URL paths, not the file system paths.
 */
const PUBLIC_ROUTES = ['/login', '/signup', '/api/auth']

/**
 * This middleware function runs for almost every request to the application.
 * It's responsible for protecting routes and handling redirects based on
 * the user's authentication state.
 * @param request - The incoming Next.js request object.
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)
  const { pathname } = request.nextUrl

  // --- REDIRECTION LOGIC (CORRECTED) ---

  // 1. If the user is unauthenticated and tries to access a protected route...
  if (!token && !PUBLIC_ROUTES.some((path) => pathname.startsWith(path))) {
    // ...redirect them to the login page.
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 2. If the user is authenticated and tries to access a public-only route...
  if (token && (pathname === '/login' || pathname === '/signup')) {
    // ...redirect them to the main dashboard.
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If none of the above conditions are met, allow the request to proceed.
  return NextResponse.next()
}

/**
 * The middleware's configuration.
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
