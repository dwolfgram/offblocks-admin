import { Suspense, lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { useFetchMyUser } from '@/api'
import { useSignOut } from '@/common/auth'
import { Loading, NotFound, ResultError, UserDropdown, Layout } from '@/common/components'
import { DASHBOARD_ROUTES } from '@/app/routes/dashboard'

const TransactionHistory = lazy(() => import('./features/transactions/pages/TransactionHistory'))
const TransactionDetail = lazy(() => import('./features/transactions/pages/TransactionDetail'))
const Profile = lazy(() => import('./features/settings'))

const Dashboard = () => {
  const { isPending: isSignOutPending } = useSignOut()

  const {
    isPending: userIsPending,
    isError: userIsError,
    error: userError,
    data,
  } = useFetchMyUser()

  if (userIsPending || isSignOutPending) {
    return <Loading />
  }

  if (userIsError) {
    return (
      <ResultError
        error={userError}
        onReset={() => window.location.reload()}
        className="container"
      />
    )
  }

  return (
    <Routes>
      <Route
        element={
          <Layout
            headerProps={{
              baseUrl: DASHBOARD_ROUTES.index.to,
              links: [{ to: DASHBOARD_ROUTES.transactionHistory.to, label: 'Transactions' }],
              endSlot: (
                <>
                  <UserDropdown email={data.user.email} />
                </>
              ),
            }}
          >
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </Layout>
        }
      >
        <Route index element={<Navigate replace to={DASHBOARD_ROUTES.transactionHistory.to} />} />
        <Route path={DASHBOARD_ROUTES.transactionHistory.path} element={<TransactionHistory />} />
        <Route path={DASHBOARD_ROUTES.transactionDetail.path} element={<TransactionDetail />} />
        <Route path={DASHBOARD_ROUTES.settings.path} element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default Dashboard
