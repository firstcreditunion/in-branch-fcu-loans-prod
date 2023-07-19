import React, { lazy, Suspense, useState, useEffect, useContext } from 'react'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'

import { HelmetProvider } from 'react-helmet-async'

import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
import ThemePrimaryColor from './components/ui/FCUTheme'

import LoginPage from './pages/auth/LoginPage'
import LogoutPage from './pages/auth/LogoutPage'
import SignUpPage from './pages/auth/SignUpPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import VerifyCodePage from './pages/auth/VerifyCodePage'
import ChangePasswordPage from './pages/auth/ChangePasswordPage'
import MultiFactorAuth from './pages/auth/MultiFactorAuth'

import UserSession from './cognito/UserSession'

import { UserAccount } from './cognito/UserAccount'

export default ({ history }) => {
  return (
    <>
      <HelmetProvider>
        <ThemeConfig>
          <ThemePrimaryColor>
            <GlobalStyles />
            <UserAccount>
              <Router history={history}>
                <Switch>
                  <Route path='/signup'>
                    <SignUpPage />
                  </Route>
                  <Route path='/logout'>
                    <LogoutPage />
                  </Route>
                  <Route path='/resetpassword'>
                    <ChangePasswordPage />
                  </Route>
                  <Route path='/forgotpassword'>
                    <ForgotPasswordPage />
                  </Route>
                  <Route path='/verifycode'>
                    <VerifyCodePage />
                  </Route>
                  <Route path='/sessionstatus'>
                    <UserSession />
                  </Route>
                  <Route path='/multifactorauth'>
                    <MultiFactorAuth />
                  </Route>
                  <Route path='/'>
                    <LoginPage />
                  </Route>
                </Switch>
              </Router>
            </UserAccount>
          </ThemePrimaryColor>
        </ThemeConfig>
      </HelmetProvider>
    </>
  )
}

// Git commit control 3
