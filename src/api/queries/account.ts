import { useQuery } from '@tanstack/react-query'
import { fetchUserAccounts } from '../endpoints'

const accountQueryKeys = {
  all: ['account'] as const,
  list: () => [...accountQueryKeys.all, 'list'] as const,
}

export const useFetchAccounts = () =>
  useQuery({
    queryKey: accountQueryKeys.list(),
    queryFn: () => fetchUserAccounts(),
  })
