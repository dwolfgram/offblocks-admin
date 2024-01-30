import { Suspense, lazy } from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'

import { rootPath } from '@/config'
import { RequireIsAnonymous } from '@/common/auth'
import { Loading, NotFound } from '@/common/components'

import { AUTH_ROUTES } from '../../app/routes/auth'
import Layout from '../../common/components/Layout'
import LanguageDropdown from '@/common/components/LanguageDropdown'
import ThemeDropdown from '@/common/components/ThemeDropdown'

const SignUp = lazy(() => import('./pages/SignUp'))
const SignIn = lazy(() => import('./pages/SignIn'))

const Auth = () => (
  <Routes>
    <Route
      element={
        <Layout
          headerProps={{
            baseUrl: AUTH_ROUTES.index.to,
            endSlot: (
              <>
                <LanguageDropdown />
                <ThemeDropdown />
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
      <Route element={<RequireIsAnonymous redirectTo={rootPath} />}>
        <Route index element={<Navigate replace to={AUTH_ROUTES.signIn.to} />} />
        <Route path={AUTH_ROUTES.signIn.path} element={<SignIn />} />
        <Route path={AUTH_ROUTES.signUp.path} element={<SignUp />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
)

export default Auth
