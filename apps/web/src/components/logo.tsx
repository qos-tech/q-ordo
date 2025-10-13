import Image from 'next/image'

import qLogo from '@/public/qos-icon.png'
import { Button } from './ui/button'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

/**
 * Renders the Q-Ordo logo icon.
 */
export function Logo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild variant="ghost" size="icon">
          {/* 2. O Link do Next.js garante uma navegação rápida no lado do cliente. */}
          <Link href="/dashboard">
            <Image
              src={qLogo}
              className="size-6"
              alt="Q-Ordo Icon"
              priority
              width={32}
              height={32}
            />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Dashboard</p>
      </TooltipContent>
    </Tooltip>
  )
}
