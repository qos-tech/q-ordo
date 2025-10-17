// apps/web/src/http/api/get-clients.ts

import { Status } from '@repo/database'
import { api } from '@/http/api-client'

export type ClientListItem = {
  id: string
  name: string
  taxId: string
  city: string | null
  status: Status
  createdAt: string
  contactEmail: string | null
  contactPhone: string | null
}

export interface GetClientsResponse {
  clients: ClientListItem[]
  total: number
}

interface GetClientsRequest {
  page?: number
  limit?: number
}

/**
 * Fetches a paginated list of client companies from the API.
 * This function now handles pagination parameters and returns pagination metadata.
 */
export async function getClients({ page = 1, limit = 10 }: GetClientsRequest) {
  // A biblioteca `ky` permite-nos passar os query parameters de forma simples.
  const response = await api('clients', {
    searchParams: { page, limit },
  })

  // Lemos os cabeçalhos de paginação da resposta da API.
  const total = Number(response.headers.get('x-total-count')) || 0
  const perPage = Number(response.headers.get('x-per-page')) || limit
  const currentPage = Number(response.headers.get('x-current-page')) || page

  const { clients } = (await response.json()) as { clients: ClientListItem[] }

  return { clients, meta: { total, perPage, currentPage } }
}
