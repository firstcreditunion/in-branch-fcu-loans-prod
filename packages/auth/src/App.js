import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'

import { HelmetProvider } from 'react-helmet-async'

import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
import ThemePrimaryColor from './components/ui/FCUTheme'

import LoginPage from './pages/auth/LoginPage'

export default ({ history }) => {
  return (
    <>
      <HelmetProvider>
        <ThemeConfig>
          <ThemePrimaryColor>
            <GlobalStyles />
            <Router history={history}>
              <Switch>
                <Route path='/auth'>
                  <LoginPage />
                </Route>
              </Switch>
            </Router>
          </ThemePrimaryColor>
        </ThemeConfig>
      </HelmetProvider>
    </>
  )
}

// Git commit control 1
