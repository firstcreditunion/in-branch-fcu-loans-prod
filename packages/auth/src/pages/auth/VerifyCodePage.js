import React from 'react'
import { Helmet } from 'react-helmet-async'
// sections
import VerifyCodeContainer from '../../sections/auth/VerifyCodeContainer'
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  return (
    <>
      <Helmet>
        <title> Verify Code | FCU Loans</title>
      </Helmet>
      <VerifyCodeContainer />
    </>
  )
}
