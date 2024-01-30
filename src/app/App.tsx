import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RequireIsLoggedIn, useAuth } from '@/common/auth'

import { AUTH_ROUTES } from '@/app/routes/auth'
import { DASHBOARD_ROUTES } from '@/app/routes/dashboard'
import { APP_ROUTES } from './routes/app'

const Auth = lazy(() => import('@/features/auth'))
const Dashboard = lazy(() => import('@/features/dashboard'))

const App = () => {
  const { isLoggedIn } = useAuth()

  const RedirectToRoot = (
    <Navigate replace to={isLoggedIn ? DASHBOARD_ROUTES.index.to : AUTH_ROUTES.index.to} />
  )

  return (
    <Routes>
      <Route path={APP_ROUTES.index.path} element={RedirectToRoot} />
      <Route path={AUTH_ROUTES.index.path} element={<Auth />} />
      <Route element={<RequireIsLoggedIn redirectTo={APP_ROUTES.index.to} />}>
        <Route path={DASHBOARD_ROUTES.index.path} element={<Dashboard />} />
      </Route>
      <Route path="*" element={RedirectToRoot} />
    </Routes>
  )
}

export default App
