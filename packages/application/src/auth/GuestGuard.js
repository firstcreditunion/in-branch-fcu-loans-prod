import React from 'react'

import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

import LoadingScreen from '../components/LoadingScreen'

import { useAuthContext } from './useAuthContext'

GuestGuard.propTypes = {
  children: PropTypes.node,
}

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext()

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />
  }

  if (!isInitialized) {
    return <LoadingScreen />
  }

  return <> {children} </>
}
