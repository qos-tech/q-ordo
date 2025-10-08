// apps/web/src/app/page.tsx

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-8 text-center">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Welcome to Q-Ordo
        </h1>
        <p className="mt-4 text-lg leading-7 text-slate-600">
          The modern, open-source platform for client management and billing
          automation.
        </p>
        <div className="mt-8 flex justify-center gap-x-4">
          <a
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Go to Login
          </a>
          <a
            href="https://github.com/qos-tech/q-ordo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-transparent px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            View on GitHub &rarr;
          </a>
        </div>
      </div>
    </main>
  )
}
