import type { HttpHandler } from 'msw'
import { http, HttpResponse, delay } from 'msw'
import { Status, RequestHeader } from '@reflet/http'

import type {
  UserEmailAvailabilityResponse,
  CreateUserPayload,
  UserResponse,
  ChangePasswordPayload,
} from '@/api'
import { PASSWORD_MIN_LENGTH } from '@/api'
import { type ApiError } from '@/api/utils'

import { createDummyData, db } from '../db'

const getTokenFromHeader = (authHeader: string | null) => (authHeader ?? '').split(' ')[1]

export const UserHandlers: HttpHandler[] = [
  http.patch<never, never, boolean>('/api/user/reset-password', async () => {
    await delay(100)
    return HttpResponse.json(true)
  }),

  http.get<{ email: string }, never, UserEmailAvailabilityResponse>(
    '/api/user/email-availability/:email',
    async ({ params: { email } }) => {
      const isAvailable = db.user.findFirst({ where: { email: { equals: email } } }) === null

      await delay(100)
      return HttpResponse.json<UserEmailAvailabilityResponse>(isAvailable)
    },
  ),

  http.post<never, CreateUserPayload, UserResponse | ApiError>('/api/user', async ({ request }) => {
    const body = await request.json()

    if (!body.email || !body.password) {
      await delay(100)
      return HttpResponse.json<ApiError>(
        { status: Status.BadRequest, message: 'Bad request' },
        { status: Status.BadRequest },
      )
    }

    if (body.password.length < PASSWORD_MIN_LENGTH) {
      await delay(100)
      return HttpResponse.json<ApiError>(
        {
          status: Status.UnprocessableEntity,
          message: 'Validation error',
          details: {
            password: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
          },
        },
        { status: Status.UnprocessableEntity },
      )
    }

    body.email = body.email.toLowerCase()

    if (db.user.findFirst({ where: { email: { equals: body.email } } }) !== null) {
      await delay(100)
      return HttpResponse.json<ApiError>(
        { status: Status.Conflict, message: 'User already exists' },
        { status: Status.Conflict },
      )
    }

    const user = db.user.create({ ...body })
    createDummyData(user.id)
    await delay(300)
    return HttpResponse.json<UserResponse>({ user })
  }),

  http.get<never, UserResponse | ApiError>('/api/user', async ({ request }) => {
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
        { status: Status.NotFound, message: 'User not found' },
        { status: Status.NotFound },
      )
    }

    await delay(100)
    return HttpResponse.json<UserResponse>({ user })
  }),

  http.get<{ userId: string }, never, UserResponse | ApiError>(
    '/api/user/:userId',
    async ({ request, params: { userId } }) => {
      const token = getTokenFromHeader(request.headers.get(RequestHeader.Authorization))

      if (!token) {
        await delay(100)
        return HttpResponse.json<ApiError>(
          { status: Status.Unauthorized, message: 'Unauthorized' },
          { status: Status.Unauthorized },
        )
      }

      const user = db.user.findFirst({ where: { id: { equals: userId } } })

      if (!user) {
        await delay(100)
        return HttpResponse.json<ApiError>(
          { status: Status.NotFound, message: 'User not found' },
          { status: Status.NotFound },
        )
      }

      await delay(100)
      return HttpResponse.json<UserResponse>({ user })
    },
  ),

  http.patch<{ userId: string }, ChangePasswordPayload, UserResponse | ApiError>(
    '/api/user/:userId/password',
    async ({ request, params: { userId } }) => {
      const token = getTokenFromHeader(request.headers.get(RequestHeader.Authorization))

      if (!token) {
        await delay(100)
        return HttpResponse.json<ApiError>(
          { status: Status.Unauthorized, message: 'Unauthorized' },
          { status: Status.Unauthorized },
        )
      }

      const body = await request.json()

      if (!body.password) {
        await delay(100)
        return HttpResponse.json<ApiError>(
          { status: Status.BadRequest, message: 'Bad request' },
          { status: Status.BadRequest },
        )
      }

      const user = db.user.findFirst({ where: { id: { equals: userId } } })

      if (!user) {
        await delay(100)
        return HttpResponse.json<ApiError>(
          { status: Status.NotFound, message: 'User not found' },
          { status: Status.NotFound },
        )
      }

      db.user.update({
        where: { id: { equals: userId } },
        data: { password: body.password },
      })

      await delay(100)
      return HttpResponse.json<UserResponse>({ user })
    },
  ),
]
