import { z } from 'zod'
import { userSchema } from './user'
import { cardShema } from './card'

export const accountShema = z.object({
  id: z.string(),
  cards: z.array(cardShema).nullable(),
  date_created: z.string(),
  name: z.string(),
  owner: z.optional(userSchema),
})

export const accountsResponseSchema = z.object({
  accounts: z.array(accountShema),
})

export type Account = z.infer<typeof accountShema>
export type AccountsResponse = z.infer<typeof accountsResponseSchema>
