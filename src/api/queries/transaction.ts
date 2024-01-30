import { useQuery } from '@tanstack/react-query'
import { fetchAccountTransactions, fetchTransaction } from '../endpoints'

const transactionQueryKeys = {
  all: ['transaction'] as const,
  transactions: (accountId: string) => [...transactionQueryKeys.all, accountId] as const,
  transaction: (accountId: string, txId: string) =>
    [...transactionQueryKeys.all, accountId, txId] as const,
}

export const useFetchAccountTransactions = (accountId: string) =>
  useQuery({
    queryKey: transactionQueryKeys.transactions(accountId),
    queryFn: () => fetchAccountTransactions(accountId),
  })

export const useFetchTransaction = (accountId: string, txId: string) =>
  useQuery({
    queryKey: transactionQueryKeys.transaction(accountId, txId),
    queryFn: () => fetchTransaction(accountId, txId),
  })
