import React, { lazy, Suspense, useState, useEffect, useContext } from 'react'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'

import { HelmetProvider } from 'react-helmet-async'

import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
import ThemePrimaryColor from './components/ui/FCUTheme'

import MBROApplicationRouter from './routes/MBROApplicationRouter'
import Placeholder from './pages/Placeholder'
import SearchClientNumber from './forms/SearchMember/SearchClientNumber'

import { UserAccount } from './cognito/UserAccount'

export default ({ history, cognitoToken, sovereignUser, expiryTime, refreshToken }) => {
  return (
    <>
      <HelmetProvider>
        <ThemeConfig>
          <ThemePrimaryColor>
            <GlobalStyles />
            <UserAccount>
              <Router history={history}>
                <Switch>
                  <Route path='/memberonlyloan'>
                    <MBROApplicationRouter history={history} cognitoToken={cognitoToken} sovereignUser={sovereignUser} expiryTime={expiryTime} refreshToken={refreshToken} />
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

// Git commit control 1