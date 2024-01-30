import type { HttpHandler } from 'msw'
import { http, HttpResponse, delay } from 'msw'
import { Status, RequestHeader } from '@reflet/http'
import type { AccountsResponse } from '@/api'
import { type ApiError } from '@/api/utils'

import { db } from '../db'

const getTokenFromHeader = (authHeader: string | null) => (authHeader ?? '').split(' ')[1]

export const AccountHandlers: HttpHandler[] = [
  http.get<never, AccountsResponse | ApiError>('/api/accounts', async ({ request }) => {
    const token = getTokenFromHeader(request.headers.get(RequestHeader.Authorization))

    if (!token) {
      await delay(100)
      return HttpResponse.json<ApiError>(
        { status: Status.Unauthorized, message: 'Unauthorized' },
        { status: Status.Unauthorized },
      )
    }
    const accounts = db.account.findMany({
      where: {
        owner: {
          id: {
            equals: token,
          },
        },
      },
    })
    await delay(100)
    return HttpResponse.json<AccountsResponse>({ accounts })
  }),
]
