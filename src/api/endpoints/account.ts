import { get } from '../client'
import { getURL, getAuthorizationHeader } from '../utils'
import { accountsResponseSchema } from '../models'

export const fetchUserAccounts = () =>
  get(accountsResponseSchema, getURL(`/accounts`), {
    headers: getAuthorizationHeader(),
  })
