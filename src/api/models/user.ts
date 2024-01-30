import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  accounts: z.array(z.object({})).optional(),
})

export const createUserPayloadSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const changePasswordPayloadSchema = z.object({
  password: z.string(),
})

export const userResponseSchema = z.object({
  user: userSchema,
})

export const resetPasswordPayloadSchema = z.object({
  email: z.string(),
})

export const resetPasswordResponseSchema = z.boolean()

export const userEmailAvailabilityResponseSchema = z.boolean()

export type User = z.infer<typeof userSchema>
export type CreateUserPayload = z.infer<typeof createUserPayloadSchema>
export type ChangePasswordPayload = z.infer<typeof changePasswordPayloadSchema>
export type ResetPasswordPayload = z.infer<typeof resetPasswordPayloadSchema>
export type UserResponse = z.infer<typeof userResponseSchema>
export type UserEmailAvailabilityResponse = z.infer<typeof userEmailAvailabilityResponseSchema>
