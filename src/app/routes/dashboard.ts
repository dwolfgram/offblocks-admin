import { generatePath, useParams } from 'react-router-dom'

export const DASHBOARD_ROUTES = {
  index: {
    path: 'app/dashboard/*',
    to: '/app/dashboard',
    absPath: '/app/dashboard',
  },
  transactionHistory: {
    path: 'transactions/*',
    to: '/app/dashboard/transactions',
    absPath: '/app/dashboard/transactions',
  },
  transactionDetail: {
    path: 'transactions/:txId/*',
    to: (txId: string) => generatePath('/app/dashboard/transactions/:txId', { txId }),
    absPath: '/app/dashboard/transactions/:txId',
  },
  settings: {
    path: 'settings/*',
    to: '/app/dashboard/settings',
    absPath: '/app/dashboard/settings',
  },
  profileChangePassword: {
    path: 'change-password',
    to: '/app/dashboard/settings/change-password',
    absPath: '/app/dashboard/settings/change-password',
  },
} as const satisfies Record<
  string,
  {
    path: string
    to: string | ((...args: string[]) => string)
    absPath: string
  }
>

export const useTransactionDetailParams = () => {
  const { txId } = useParams<'txId'>()
  if (!txId) {
    throw new Error('Missing txId parameter')
  }
  return txId
}
