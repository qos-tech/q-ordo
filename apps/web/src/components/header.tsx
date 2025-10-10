import { Separator } from './ui/separator'
import { ThemeToggle } from './theme-toggle'
import { ProfileButton } from './profile-button'
import { Logo } from './logo'

/**
 * The main application header.
 * This is a Server Component that composes client components for interactivity.
 */
export async function Header() {
  return (
    <header className="border-b bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Separator orientation="vertical" className="h-5" />
          <ProfileButton />
        </div>
      </div>
    </header>
  )
}
