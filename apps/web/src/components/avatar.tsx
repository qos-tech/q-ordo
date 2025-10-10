// apps/web/src/components/avatar.tsx
'use client'

import { useState } from 'react'
import md5 from 'md5'

interface AvatarProps {
  name: string
  email: string | null | undefined
}

/**
 * A component that displays a user's avatar from Gravatar,
 * with a robust fallback to the user's initials.
 */
export function Avatar({ name, email }: AvatarProps) {
  const [imageHasLoaded, setImageHasLoaded] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  const emailHash = email ? md5(email.trim().toLowerCase()) : ''
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=80&d=404`

  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
      {/* 1. O fallback de iniciais é renderizado sempre, mas fica invisível se a imagem carregar. */}
      <span
        className={`transition-opacity ${imageHasLoaded ? 'opacity-0' : 'opacity-100'}`}
      >
        {getInitials(name)}
      </span>

      {/* 2. A imagem é renderizada por cima, mas começa invisível. */}
      {email && (
        <img
          src={gravatarUrl}
          alt={name}
          className={`absolute h-full w-full rounded-full transition-opacity ${
            imageHasLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => {
            // 3. Se a imagem carregar com sucesso, nós a tornamos visível.
            setImageHasLoaded(true)
          }}
          onError={() => {
            // 4. Se a imagem falhar, não fazemos nada. As iniciais permanecerão visíveis.
            console.error('Gravatar image failed to load.')
          }}
        />
      )}
    </div>
  )
}
