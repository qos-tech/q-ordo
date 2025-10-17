// apps/web/src/components/main-menu.tsx
'use client'

import { Building, SquareMenu, Users } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

/**
 * A client component that renders the main navigation menu as a dropdown,
 * with a descriptive tooltip on hover.
 */
export function MainMenu() {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* O DropdownMenuTrigger é o único filho direto do TooltipTrigger */}
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <SquareMenu className="size-6" />
              <span className="sr-only">Open main menu</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Main menu</p>
        </TooltipContent>
      </Tooltip>

      {/* O DropdownMenuContent é um "irmão" do Tooltip, não um filho do Trigger. */}
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/clients">
              <Building className="mr-2 size-4" />
              <span>Clients</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/users">
              <Users className="mr-2 size-4" />
              <span>Users</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
