// apps/web/src/components/ui/pagination.tsx
'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from './button'

interface PaginationProps {
  totalCount: number
  perPage: number
  currentPage: number
}

/**
 * A client component for navigating between paginated results.
 * It reads the current page from the URL and updates it on button clicks.
 */
export function Pagination({
  totalCount,
  perPage,
  currentPage,
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(totalCount / perPage) || 1

  function onPageChange(page: number) {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('page', String(page))
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div className="text-muted-foreground flex items-center justify-between text-sm">
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
        >
          <ChevronLeft className="mr-2 size-4" />
          Previous
        </Button>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          variant="outline"
          size="sm"
        >
          Next
          <ChevronRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  )
}
