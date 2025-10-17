// apps/web/src/components/page-layout.tsx
import { type ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
}

/**
 * A component that provides a consistent layout wrapper for all main pages.
 * It is responsible for setting the background color, max-width, padding,
 * and spacing for the page content.
 */
export function PageLayout({ children }: PageLayoutProps) {
  return (
    // Este div é o nosso "canvas" da página, com a cor de fundo e o layout corretos.
    <div className="bg-zinc-100 dark:bg-zinc-900">
      <div className="mx-auto w-full max-w-7xl space-y-2 px-2 py-2">
        {children}
      </div>
    </div>
  )
}
