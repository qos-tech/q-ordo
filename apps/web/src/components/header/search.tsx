'use client'

import { Search as SearchIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

/**
 * A client component that renders the main search bar for the header.
 */
export function Search() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative w-full max-w-xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
            <SearchIcon className="size-4 text-zinc-500 dark:text-zinc-400" />
          </div>
          <Input
            type="search"
            placeholder="Search..."
            className="h-8 w-full rounded border-zinc-400 bg-zinc-200 pl-9 text-zinc-500 dark:border-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Search</p>
      </TooltipContent>
    </Tooltip>
  )
}
