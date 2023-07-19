import React, { useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
// sections
import LogoutContainer from '../../sections/auth/LogoutContainer'
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LogoutPage() {
  return (
    <>
      <Helmet>
        <title> Log Out | FCU Staff Portal</title>
      </Helmet>
      <LogoutContainer />
    </>
  )
}
