export const AUTH_ROUTES = {
  index: {
    path: 'app/auth/*',
    to: '/app/auth',
  },
  signUp: {
    path: 'sign-up',
    to: '/app/auth/sign-up',
  },
  signIn: {
    path: 'sign-in',
    to: '/app/auth/sign-in',
  },
  confirmEmail: {
    path: 'confirm-email',
    to: '/app/auth/confirm-email',
  },
  resetPassword: {
    path: 'reset-password',
    to: '/app/auth/reset-password',
  },
} as const
