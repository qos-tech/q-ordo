// apps/web/src/components/theme-provider.tsx
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * A client component that acts as a wrapper around the `next-themes` provider.
 * This abstraction allows us to easily swap out the theme management library in the future
 * without changing how it's integrated into our main layout.
 *
 * It passes all props down to the underlying provider, making it fully configurable.
 * @param {ThemeProviderProps} props - The props to pass to the NextThemesProvider.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
