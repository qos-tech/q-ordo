// apps/web/src/app/(dashboard)/clients/page.tsx
import { z } from 'zod'
import { PlusCircle } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PageLayout } from '@/components/page-layout'
import { StatusBadge } from '@/components/ui/status-badge'
import { Pagination } from '@/components/ui/pagination'
import { auth } from '@/auth/auth'
import { getClients } from '@/http/get-clients'
import { Breadcrumb } from '@/components/breadcrumb'

// 1. A interface de props para a nossa página.
interface ClientsPageProps {
  searchParams: {
    page?: string
  }
}

/**
 * The client list page, now with correct data fetching and layout composition.
 */
export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  // 2. A função 'auth' é chamada, mas não precisamos de 'await' se ela só redireciona.
  auth()

  const page = z.coerce.number().default(1).parse(searchParams.page)

  const { clients, meta } = await getClients({ page })

  return (
    // 4. O 'PageLayout' "embrulha" todo o conteúdo da página.
    <div>
      <PageHeader>
        <Breadcrumb title="Clients" />
        <Button variant={'primary'}>
          <PlusCircle className="mr-2 size-4" />
          Add New Client
        </Button>
      </PageHeader>
      <PageLayout>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Primary Contact</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="w-[140px] text-center">Status</TableHead>
                <TableHead className="w-[180px] text-center">
                  Created At
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {client.contactEmail}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {client.city || '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={client.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination
          currentPage={meta.currentPage}
          perPage={meta.perPage}
          totalCount={meta.total}
        />
      </PageLayout>
    </div>
  )
}
