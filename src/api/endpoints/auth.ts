import { post, patch } from '../client'
import { getURL, getAuthorizationHeader } from '../utils'
import type { ResetPasswordPayload, SignInPayload } from '../models'
import { resetPasswordResponseSchema, signInResponseSchema, signOutResponseSchema } from '../models'

export const signIn = (body: SignInPayload) =>
  post(signInResponseSchema, getURL('/auth/sign-in'), {
    body,
  })

export const relogin = () =>
  patch(signInResponseSchema, getURL('/auth/relogin'), {
    headers: getAuthorizationHeader(),
  })

export const signOut = () =>
  post(signOutResponseSchema, getURL('/auth/sign-out'), {
    headers: getAuthorizationHeader(),
  })

export const resetPassword = (body: ResetPasswordPayload, redirectTo: string) =>
  patch(resetPasswordResponseSchema, getURL('/user/reset-password', { redirectTo }), {
    body,
  })
