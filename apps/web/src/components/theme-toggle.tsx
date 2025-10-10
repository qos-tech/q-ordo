'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

/**
 * A client component that allows the user to toggle between light and dark themes.
 * It uses the `next-themes` library to manage the theme state.
 */
export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  /**
   * Toggles the theme between 'light' and 'dark'.
   */
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {/* The Sun icon is visible in light mode and scales/rotates out in dark mode. */}
      <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      {/* The Moon icon is hidden in light mode and scales/rotates in in dark mode. */}
      <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
