import { z } from 'zod'

export const signInPayloadSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const signInResponseSchema = z.object({
  token: z.string(),
  userId: z.string(),
})

export const signOutResponseSchema = z.boolean()

export type SignInPayload = z.infer<typeof signInPayloadSchema>
export type SignInResponse = z.infer<typeof signInResponseSchema>
export type SignOutResponse = z.infer<typeof signOutResponseSchema>
