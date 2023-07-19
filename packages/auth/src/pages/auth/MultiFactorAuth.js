import React from 'react'
import { Helmet } from 'react-helmet-async'
// sections
import CognitoMFA from '../../sections/auth/CognitoMFA'
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function MultiFactorAuth() {
  return (
    <>
      <Helmet>
        <title> Two-factor Authentication | FCU Staff Portal</title>
      </Helmet>
      <CognitoMFA />
    </>
  )
}
