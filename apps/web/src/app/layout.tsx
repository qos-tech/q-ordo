import './globals.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Q-Ordo',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
