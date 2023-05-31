import { Navigate, useRoutes } from 'react-router-dom'

import AuthGuard from '../auth/AuthGuard'
import GuestGuard from '../auth/GuestGuard'

import DashboardLayout from '../layouts/dashboard'

import { LoginPage } from './elements'

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
      ],
    },
  ])
}
