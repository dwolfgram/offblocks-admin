import { get, post } from '../client'
import { getURL, getAuthorizationHeader } from '../utils'
import type { CreateUserPayload } from '../models'
import { userResponseSchema, userEmailAvailabilityResponseSchema } from '../models'

export const fetchUserEmailAvailability = (email: string) =>
  get(userEmailAvailabilityResponseSchema, getURL(`/user/email-availability/${email}`))

export const createUser = (body: CreateUserPayload) =>
  post(userResponseSchema, getURL('/user'), {
    headers: getAuthorizationHeader(),
    body,
  })

export const fetchMyUser = () =>
  get(userResponseSchema, getURL(`/user`), {
    headers: getAuthorizationHeader(),
  })

export const fetchUser = (userId: string) =>
  get(userResponseSchema, getURL(`/user/${userId}`), {
    headers: getAuthorizationHeader(),
  })
