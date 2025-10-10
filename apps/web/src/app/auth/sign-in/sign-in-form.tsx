'use client'

// 1. Importe o useState e os ícones Eye e EyeOff
import { useState } from 'react'
import { AlertTriangle, Lock, Loader2, Mail, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInWithEmailAndPassword } from './actions'
import { useFormState } from '@/app/hooks/use-form-state'

/**
 * A client component that renders the sign-in form and handles user authentication.
 * It uses a custom `useFormState` hook to manage form submission and state.
 */
export function SignInForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      // On successful login, redirect to the main dashboard.
      router.push('/dashboard')
    },
  )

  // 2. Crie o estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            id="email"
            icon={Mail}
            placeholder="Enter your email"
          />

          {errors?.email && (
            <p className="text-xs font-medium text-red-500">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          {/* 3. Envolva o Input em uma div com posicionamento relativo */}
          <div className="relative">
            <Input
              name="password"
              // 4. Mude o tipo do input com base no estado
              type={showPassword ? 'text' : 'password'}
              id="password"
              icon={Lock}
              placeholder="Enter you password"
              // Adicione padding à direita para o texto não ficar sob o ícone
              className="pr-10"
            />
            {/* 5. Adicione o botão com o ícone dentro da div */}
            <button
              type="button" // Importante para não submeter o formulário
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-300"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          {errors?.password && (
            <p className="text-xs font-medium text-red-500">
              {errors.password[0]}
            </p>
          )}

          <Link
            href="/auth/forgot-password"
            className="mt-2 inline-block text-xs font-medium text-zinc-600 hover:underline dark:text-zinc-300"
          >
            Forgot your password?
          </Link>
        </div>

        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with email'
          )}
        </Button>
      </form>

      <p className="px-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/sign-up"
          className="font-semibold text-sky-600 hover:underline dark:text-sky-300"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
