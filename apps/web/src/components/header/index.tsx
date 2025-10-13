import { ThemeToggle } from '../theme-toggle'
import { ProfileButton } from './profile-button'
import { Logo } from '../logo'
import { MainMenu } from './main-menu'
import { Search } from './search'
import { Notifications } from './notifications'
import { KnowledgeBaseButton } from './knowledge-base-button'
import { TooltipProvider } from '../ui/tooltip'

/**
 * The main application header.
 * This is a Server Component that composes client components for interactivity.
 */
export function Header() {
  return (
    // A CORREÇÃO ESTÁ AQUI: O <header> agora é o nosso contentor flex principal.
    // Ele tem o padding, a altura e o justify-between.
    <header className="flex h-12 items-center justify-between border-b bg-white px-2 dark:border-zinc-800 dark:bg-zinc-950">
      <TooltipProvider delayDuration={100}>
        <div className="flex items-center gap-1">
          <MainMenu />
          <Logo />
        </div>
        <div className="hidden flex-1 justify-center md:flex">
          <Search />
        </div>
        {/* Lado Direito: Os controlos do utilizador. */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <KnowledgeBaseButton />
          <Notifications count={4} />
          <ProfileButton />
        </div>
      </TooltipProvider>
    </header>
  )
}
