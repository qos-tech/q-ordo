import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { SignInForm } from './sign-in-form'
import Image from 'next/image'
import qordoLogo from '@/public/q-ordo_logo.svg'

/**
 * The main page for user sign-in.
 * Its primary responsibility is to set up the page layout and render the sign-in form.
 */
export default function SignInPage() {
  return (
    // This div is responsible for the overall page layout: background and centering.
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <div className="w-36">
            <Image
              src={qordoLogo}
              alt="Q-Ordo Logo"
              width={1960}
              height={750}
              className="h-auto w-full"
              priority
            />
          </div>
          {/* <CardTitle className="text-2xl">Sign In</CardTitle> */}
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  )
}
