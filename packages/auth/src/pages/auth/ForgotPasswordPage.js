import React from 'react'
import { Helmet } from 'react-helmet-async'
// sections
import ForgotPasswordContainer from '../../sections/auth/ForgotPasswordContainer'
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Forgot Password | FCU Loans</title>
      </Helmet>
      <ForgotPasswordContainer />
    </>
  )
}
