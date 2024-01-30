import type { HttpHandler } from 'msw'
import { http, HttpResponse, delay } from 'msw'
import { Status, RequestHeader } from '@reflet/http'
import type { TransactionsResponse, TransactionResponse } from '@/api'
import { type ApiError } from '@/api/utils'

import { db } from '../db'

const getTokenFromHeader = (authHeader: string | null) => (authHeader ?? '').split(' ')[1]

export const TransactionHandlers: HttpHandler[] = [
  http.get<{ accountId: string }, never, TransactionsResponse | ApiError>(
    '/api/transactions/:accountId',
    async ({ request, params: { accountId } }) => {
      const token = getTokenFromHeader(request.headers.get(RequestHeader.Authorization))

      if (!token) {
        await delay(100)
        return HttpResponse.json<ApiError>(
          { status: Status.Unauthorized, message: 'Unauthorized' },
          { status: Status.Unauthorized },
        )
      }
      const transactions = db.transaction.findMany({
        where: {
          account: {
            id: {
              equals: accountId,
            },
            owner: {
              id: {
                equals: token,
              },
            },
          },
        },
      })
      await delay(100)
      return HttpResponse.json<TransactionsResponse>({ transactions })
    },
  ),
  http.get<{ accountId: string; txId: string }, never, TransactionResponse | ApiError>(
    '/api/transactions/:accountId/:txId',
    async ({ request, params: { accountId, txId } }) => {
      const token = getTokenFromHeader(request.headers.get(RequestHeader.Authorization))

      if (!token) {
        await delay(100)
        return HttpResponse.json<ApiError>(
          { status: Status.Unauthorized, message: 'Unauthorized' },
          { status: Status.Unauthorized },
        )
      }
      const transaction = db.transaction.findFirst({
        where: {
          id: {
            equals: txId,
          },
          account: {
            id: {
              equals: accountId,
            },
            owner: {
              id: {
                equals: token,
              },
            },
          },
        },
      })
      await delay(100)
      return HttpResponse.json<TransactionResponse>({ transaction })
    },
  ),
]
