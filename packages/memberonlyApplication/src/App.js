import React, { lazy, Suspense, useState, useEffect, useContext } from 'react'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'

import { HelmetProvider } from 'react-helmet-async'

import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
import ThemePrimaryColor from './components/ui/FCUTheme'

import MBROApplicationRouter from './routes/MBROApplicationRouter'

import Placeholder from './pages/Placeholder'

import SearchClientNumber from './forms/SearchMember/SearchClientNumber'

export default ({ history }) => {
  return (
    <>
      <HelmetProvider>
        <ThemeConfig>
          <ThemePrimaryColor>
            <GlobalStyles />
            <Router history={history}>
              <Switch>
                <Route path='/memberonlyloan'>
                  <MBROApplicationRouter history={history} />
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
