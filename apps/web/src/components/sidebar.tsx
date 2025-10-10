// apps/web/src/app/(dashboard)/components/sidebar.tsx
'use client'

/**
 * The main sidebar navigation for the authenticated dashboard layout.
 */
export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-10 h-full w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-16 items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Q-Ordo
        </span>
      </div>
      <nav className="flex flex-col p-4">
        {/* Navigation links will be added here */}
        <a
          href="/dashboard"
          className="rounded-md bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
        >
          Dashboard
        </a>
        <a
          href="/dashboard/clients"
          className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          Clients
        </a>
      </nav>
    </aside>
  )
}
