import React, { Suspense, lazy } from 'react'

import LoadingScreen from '../components/LoadingScreen'

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )

//* Auth
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')))
