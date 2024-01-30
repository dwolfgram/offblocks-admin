import type { HttpHandler } from 'msw'

import { AccountHandlers } from './account'
import { AuthHandlers } from './auth'
import { TransactionHandlers } from './transaction'
import { UserHandlers } from './user'

export const handlers: HttpHandler[] = [
  ...AccountHandlers,
  ...AuthHandlers,
  ...TransactionHandlers,
  ...UserHandlers,
]
