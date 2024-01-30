import { get } from '../client'
import { getURL, getAuthorizationHeader } from '../utils'
import { transactionsResponseSchema, transactionResponseSchema } from '../models'

export const fetchAccountTransactions = (accountId: string) =>
  get(transactionsResponseSchema, getURL(`/transactions/${accountId}`), {
    headers: getAuthorizationHeader(),
  })

export const fetchTransaction = (accountId: string, txId: string) =>
  get(transactionResponseSchema, getURL(`/transactions/${accountId}/${txId}`), {
    headers: getAuthorizationHeader(),
  })
