import { UserRound, LogOut } from 'lucide-react'

import { auth } from '@/auth/auth'
import { getGravatarUrl } from '@/http/gravatar'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'

function getIntials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 1)
    .join('')
    .toUpperCase()
}

export async function ProfileButton() {
  const { user } = await auth()

  const firstName = user.name.split(' ')[0]

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            {/* <DropdownMenuTrigger className="flex items-center gap-3 outline-none"> */}
            <Button variant="ghost" size="icon">
              <Avatar className="size-6">
                {user.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} />
                ) : user.email ? (
                  <AvatarImage src={getGravatarUrl(user.email)} />
                ) : null}

                {user.name && (
                  <AvatarFallback className="bg-sky-600 text-sm font-semibold text-zinc-50">
                    {getIntials(user.name)}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
            {/* <ChevronDown className="text-muted-foreground size-4" /> */}
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <a href="#">
              <UserRound className="mr-2 size-4" />
              Profile
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/api/auth/sign-out">
              <LogOut className="mr-2 size-4" />
              Sign out
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent>
        <p>
          {firstName} ({user.email})
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
