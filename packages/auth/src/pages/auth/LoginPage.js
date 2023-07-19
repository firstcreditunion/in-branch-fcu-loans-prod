import React, { useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
// sections
import Login from '../../sections/auth/LoginContainer'
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | FCU Loans</title>
      </Helmet>
      <Login />
    </>
  )
}