// apps/web/src/app/(dashboard)/clients/page.tsx
import { PlusCircle } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth/auth'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageLayout } from '@/components/page-layout'

export default async function UsersPage() {
  await auth()

  return (
    <div>
      <PageHeader>
        <Breadcrumb title="Users" />
        <Button variant={'primary'}>
          <PlusCircle className="mr-2 size-4" />
          Add New User
        </Button>
      </PageHeader>
      <PageLayout>
        <main className="mx-auto w-full px-4 py-2 sm:px-6 lg:px-8">
          <div className="rounded-md border"></div>
        </main>
      </PageLayout>
    </div>
  )
}
