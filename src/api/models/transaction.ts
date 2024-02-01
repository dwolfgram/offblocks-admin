import { z } from 'zod'
import { accountShema } from '.'
import { cardShema } from './card'

export const transactionShema = z.object({
  id: z.string(),
  account: z.optional(accountShema),
  amount: z.string(),
  card: z.optional(cardShema),
  currency: z.string(),
  currency_symbol: z.string(),
  date_confirmed: z.string().nullable(),
  date_created: z.string(),
  merchant_details: z.object({
    name: z.string().optional(),
    category_id: z.number().optional(),
    category_name: z.string().optional(),
  }),
  status: z.string(),
})

export const lightWeightTransactionSchema = transactionShema.partial({
  account: true,
  card: true,
  merchant_details: true,
})

export const transactionResponseSchema = z.object({
  transaction: z.nullable(transactionShema),
})

export const transactionsResponseSchema = z.object({
  transactions: z.array(lightWeightTransactionSchema),
  page: z.number(),
  limit: z.number(),
  numOfPages: z.number(),
})

export type Transaction = z.infer<typeof transactionShema>
export type TransactionResponse = z.infer<typeof transactionResponseSchema>
export type TransactionsResponse = z.infer<typeof transactionsResponseSchema>
