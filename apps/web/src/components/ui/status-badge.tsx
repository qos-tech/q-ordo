// apps/web/src/components/ui/status-badge.tsx
import { Status } from '@repo/database'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: Status
}

const statusMap: Record<Status, { label: string; className: string }> = {
  ACTIVE: { label: 'Active', className: 'bg-green-500' },
  INACTIVE: { label: 'Inactive', className: 'bg-zinc-500' },
  SUSPENDED: { label: 'Suspended', className: 'bg-red-500' },
}

/**
 * A component to display a colored badge for a given status.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = statusMap[status] || {
    label: 'Unknown',
    className: 'bg-gray-400',
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn('size-2 rounded-full', className)}
        aria-hidden="true"
      />
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
  )
}
