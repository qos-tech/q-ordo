// apps/web/src/components/page-header.tsx
import { type ReactNode } from 'react'

interface PageHeaderProps {
  children: ReactNode
}

/**
 * A component that renders a consistent header for each page in the dashboard.
 * Its only responsibility is to align the title and action buttons horizontally.
 */
export function PageHeader({ children }: PageHeaderProps) {
  return (
    <div className="h-14 items-center border-b border-zinc-200 bg-zinc-100 px-8 py-2 dark:border-zinc-700 dark:bg-zinc-900">
      {/* 'hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-accent-foreground', */}
      <div className="flex items-center justify-between">{children}</div>
    </div>
  )
}
