'use client'

import { BadgeQuestionMark } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

/**
 * A client component that renders a link to the knowledge base as an icon button.
 */
export function KnowledgeBaseButton() {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="ghost" size="icon">
            <Link href="/kb">
              <BadgeQuestionMark className="size-6" />
              <span className="sr-only">Knowledge Base</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Knowledge Base</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
