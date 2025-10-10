import { Slash } from 'lucide-react'
import Image from 'next/image'

import qordoLogo from '@/assets/q-ordo_logo.svg'

/**
 * Renders the Q-Ordo logo icon.
 */
export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image src={qordoLogo} className="size-12" alt="Q-Ordo Icon" priority />
      <Slash className="size-3 -rotate-[24deg] text-zinc-300 dark:text-zinc-700" />
    </div>
  )
}
