'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '../ui/button'

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="hover:bg-zinc-200 dark:hover:bg-zinc-700"
    >
      {isDark ? (
        <Moon className="size-4 text-blue-500" />
      ) : (
        <Sun className="size-4 text-yellow-500" />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
