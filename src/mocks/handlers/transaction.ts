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
      const url = new URL(request.url)
      const page = url.searchParams.get('page')
      const limit = url.searchParams.get('limit')
      const token = getTokenFromHeader(request.headers.get(RequestHeader.Authorization))
      const pageIndex = page ? Number.parseInt(page) : 0
      const limitNum = limit ? Number.parseInt(limit) : 50

      if (!token) {
        await delay(100)
        return HttpResponse.json<ApiError>(
          { status: Status.Unauthorized, message: 'Unauthorized' },
          { status: Status.Unauthorized },
        )
      }
      const count = db.transaction.count()
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
        orderBy: {
          date_created: 'desc',
        },
        take: limitNum,
        skip: pageIndex * limitNum,
      })
      await delay(100)
      return HttpResponse.json<TransactionsResponse>({
        transactions,
        page: pageIndex,
        limit: limitNum,
        numOfPages: Math.ceil(count / limitNum),
      })
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
