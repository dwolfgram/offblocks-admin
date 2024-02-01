import { useQuery } from '@tanstack/react-query'
import { fetchAccountTransactions, fetchTransaction } from '../endpoints'

const transactionQueryKeys = {
  all: ['transaction'] as const,
  transactions: (accountId: string, page: number, limit: number) =>
    [...transactionQueryKeys.all, accountId, 'history', page, limit] as const,
  transaction: (accountId: string, txId: string) =>
    [...transactionQueryKeys.all, accountId, txId] as const,
}

export const useFetchAccountTransactions = (
  accountId: string,
  { page, limit }: { page: number; limit: number },
) =>
  useQuery({
    queryKey: transactionQueryKeys.transactions(accountId, page, limit),
    queryFn: () => fetchAccountTransactions(accountId, { page, limit }),
    enabled: Boolean(accountId),
    staleTime: 60_000,
  })

export const useFetchTransaction = (accountId: string, txId: string) =>
  useQuery({
    queryKey: transactionQueryKeys.transaction(accountId, txId),
    queryFn: () => fetchTransaction(accountId, txId),
    enabled: Boolean(accountId) && Boolean(txId),
  })
