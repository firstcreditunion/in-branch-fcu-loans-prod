import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { HelmetProvider } from 'react-helmet-async'

import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
import ThemePrimaryColor from './components/ui/FirstLoanTheme'

import Router from './routes'

export default () => {
  return (
    <>
      <HelmetProvider>
        <ThemeConfig>
          <ThemePrimaryColor>
            <GlobalStyles />
            <Router />
          </ThemePrimaryColor>
        </ThemeConfig>
      </HelmetProvider>
    </>
  )
}

// Git commit control 18
