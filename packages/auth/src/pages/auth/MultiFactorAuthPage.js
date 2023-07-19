import React from 'react'
import { Helmet } from 'react-helmet-async'
// sections
import MultiFactorAuthContainer from '../../sections/auth/MultiFactorAuthContainer'
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function MultiFactorAuthPage() {
  return (
    <>
      <Helmet>
        <title> Multi-Factor Authentication | FCU Loans</title>
      </Helmet>
      <MultiFactorAuthContainer />
    </>
  )
}
