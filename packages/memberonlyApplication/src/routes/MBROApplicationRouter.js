import React from 'react'

import { Switch, Route, Router } from 'react-router-dom'

import MemberDetailsLayout from '../layouts/MemberDetailsLayout'

import ApplicationHeader from '../layouts/mui-dashboard/ApplicationHeader'
import { Box, Container, Grid, Paper } from '@mui/material'

import useMediaQuery from '@mui/material/useMediaQuery'

export default function ApplicationRouter({ history, cognitoToken, sovereignUser, expiryTime, refreshToken }) {
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <>
      <Router history={history}>
        <ApplicationHeader />
        <Switch>
          <Route path='/memberonlyloan'>
            <MemberDetailsLayout cognitoToken={cognitoToken} sovereignUser={sovereignUser} expiryTime={expiryTime} refreshToken={refreshToken} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
