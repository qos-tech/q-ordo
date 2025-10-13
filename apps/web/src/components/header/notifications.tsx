'use client'

import { Bell } from 'lucide-react'

import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface NotificationsProps {
  count?: number // The number of notifications to display.
}

/**
 * A client component that displays a notification bell icon.
 * It shows a badge with a count of unread notifications, positioned neatly on the icon's corner.
 */
export function Notifications({ count = 0 }: NotificationsProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="size-6" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* O crachá só é renderizado se houver notificações. */}
          {count > 0 && (
            <div className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
              {count}
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Notifications</p>
      </TooltipContent>
    </Tooltip>
  )
}
