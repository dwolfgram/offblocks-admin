import type { HttpHandler } from 'msw'
import { http, HttpResponse, delay } from 'msw'
import { Status, RequestHeader } from '@reflet/http'
import type { SignInPayload, SignInResponse, SignOutResponse } from '@/api'
import { type ApiError } from '@/api/utils'

import { db } from '../db'

const getTokenFromHeader = (authHeader: string | null) => (authHeader ?? '').split(' ')[1]

export const AuthHandlers: HttpHandler[] = [
  http.post<never, SignInPayload, SignInResponse | ApiError>(
    '/api/auth/sign-in',
    async ({ request }) => {
      const body = await request.json()

      if (!body.email || !body.password) {
        await delay(100)
        return HttpResponse.json<ApiError>(
          { status: Status.BadRequest, message: 'Bad request' },
          { status: Status.BadRequest },
        )
      }

      const user = db.user.findFirst({ where: { email: { equals: body.email } } })

      if (!user || user.password !== body.password) {
        await delay(100)
        return HttpResponse.json<ApiError>(
          { status: Status.Unauthorized, message: 'Unauthorized' },
          { status: Status.Unauthorized },
        )
      }

      await delay(100)
      return HttpResponse.json<SignInResponse>({
        token: user.id,
        userId: user.id,
      })
    },
  ),

  http.patch<never, never, SignInResponse | ApiError>('/api/auth/relogin', async ({ request }) => {
    const token = getTokenFromHeader(request.headers.get(RequestHeader.Authorization))

    if (!token) {
      await delay(100)
      return HttpResponse.json<ApiError>(
        { status: Status.Unauthorized, message: 'Unauthorized' },
        { status: Status.Unauthorized },
      )
    }

    const user = db.user.findFirst({ where: { id: { equals: token } } })

    if (!user) {
      await delay(100)
      return HttpResponse.json<ApiError>(
        { status: Status.Unauthorized, message: 'Unauthorized' },
        { status: Status.Unauthorized },
      )
    }

    await delay(100)
    return HttpResponse.json<SignInResponse>({
      token: user.id,
      userId: user.id,
    })
  }),

  http.post('/api/auth/sign-out', async () => {
    await delay(100)
    return HttpResponse.json<SignOutResponse>(true)
  }),
]
