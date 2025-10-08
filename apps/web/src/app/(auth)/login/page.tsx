// apps/web/src/app/(auth)/login/page.tsx
'use client'

import { useState, type ComponentProps, FormEvent, ElementType } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { HTTPError } from 'ky'
import { User, Lock } from 'lucide-react'

// =================================================================
// UI Micro-components
// These are small, co-located components specific to this page for UI consistency.
// =================================================================

/**
 * A styled label component.
 */
function Label({ className, ...props }: ComponentProps<'label'>) {
  return (
    <label
      className={`text-sm leading-none font-medium text-zinc-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  )
}

/**
 * A styled input component that can optionally render an icon.
 */
function Input({
  className,
  icon: Icon,
  ...props
}: ComponentProps<'input'> & { icon?: ElementType }) {
  return (
    <div className="relative">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-zinc-400" />
        </div>
      )}
      <input
        className={`flex h-10 w-full rounded-md border border-zinc-200 bg-transparent py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
          Icon ? 'pl-10' : 'px-3'
        } ${className}`}
        {...props}
      />
    </div>
  )
}

/**
 * A styled button component with different variants.
 */
function Button({
  className,
  variant = 'default',
  ...props
}: ComponentProps<'button'> & { variant?: 'default' | 'ghost' }) {
  const baseClasses =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  const variants = {
    default: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2',
    ghost: 'hover:bg-zinc-100 hover:text-zinc-900',
  }
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}

/**
 * A set of Card components for creating consistent bordered layouts.
 */
function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={`rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm ${className}`}
      {...props}
    />
  )
}
function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  )
}
function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      className={`text-2xl leading-none font-semibold tracking-tight ${className}`}
      {...props}
    />
  )
}
function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={`text-sm text-zinc-500 ${className}`} {...props} />
}
function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />
}
function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
  )
}

// =================================================================
// Main Login Page Component
// =================================================================

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Handles the form submission for the login process.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const { email, password } = Object.fromEntries(formData)

    try {
      // 1. Call our backend API to get the JWT.
      const response = await api
        .post('auth/login', {
          json: { email, password },
        })
        .json<{ token: string }>()

      // 2. Call our local Next.js API route to set the secure, httpOnly cookie.
      await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.token }),
      })

      // 3. Redirect to the dashboard on success.
      router.push('/dashboard')
    } catch (err) {
      if (err instanceof HTTPError) {
        const { message } = await err.response.json()
        setError(message)
      } else {
        setError('An unexpected error occurred. Please try again.')
        console.error(err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                disabled={isLoading}
                icon={User}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                disabled={isLoading}
                icon={Lock}
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <div className="text-center text-sm text-zinc-500">
            Don&apos;t have an account?{' '}
            <a
              href="/signup"
              className="font-semibold text-zinc-900 hover:underline"
            >
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
