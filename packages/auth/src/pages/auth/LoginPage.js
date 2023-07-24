import React, { useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
// sections
import Login from '../../sections/auth/LoginContainer'
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LoginPage({ setSovereignUser }) {
  return (
    <>
      <Helmet>
        <title> Login | FCU Staff Portal</title>
      </Helmet>
      <Login setSovereignUser={setSovereignUser} />
    </>
  )
}
