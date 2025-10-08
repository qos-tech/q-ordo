import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/auth-context' // <-- 1. IMPORTE O NOSSO PROVEDOR
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Q-Ordo',
  description: 'The modern billing platform.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. "EMBRULHE" A NOSSA APLICAÇÃO COM O PROVEDOR */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
