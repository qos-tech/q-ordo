// apps/web/src/components/ui/breadcrumb.tsx
import { ChevronRight, LayoutGrid } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbProps {
  title: string
}

/**
 * A component that renders a breadcrumb navigation trail for a page.
 * It includes a link to the main dashboard and the current page title.
 */
export function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      {/* A cor base do texto e dos ícones é definida aqui */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          {/* O ícone dentro do link herdará a cor do link, incluindo o estado de hover. */}
          <LayoutGrid className="size-4" />
          <span className="sr-only">Dashboard</span>
        </Link>

        {/* O ícone separador herda a cor base do div. */}
        <ChevronRight className="size-4" />

        <span className="font-medium text-zinc-900 dark:text-zinc-50">
          {title}
        </span>
      </div>
    </nav>
  )
}
