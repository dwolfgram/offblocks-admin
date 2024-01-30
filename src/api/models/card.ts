import { z } from 'zod'

export const cardShema = z.object({
  id: z.string(),
  brand: z.string(),
  last_4: z.string(),
})

export type Card = z.infer<typeof cardShema>
