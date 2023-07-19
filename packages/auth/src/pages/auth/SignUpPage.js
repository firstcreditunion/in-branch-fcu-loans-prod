import React from 'react'
import { Helmet } from 'react-helmet-async'
// sections
import SignUp from '../../sections/auth/SignUpContainer'
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Sign Up | FCU Staff Portal</title>
      </Helmet>
      <SignUp />
    </>
  )
}
