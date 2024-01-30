/**
 * Routes
 */
export const APP_ROUTES = {
  index: {
    path: 'app/*',
    to: '/app',
    absPath: '/app',
  },
} as const satisfies Record<
  string,
  {
    path: string
    to: string | ((...args: string[]) => string)
    absPath: string
  }
>
