import React, { useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
// sections
import ChangePasswordContainer from '../../sections/auth/ChangePasswordContainer'
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LogoutPage() {
  return (
    <>
      <Helmet>
        <title> Reset Password | FCU Loans</title>
      </Helmet>
      <ChangePasswordContainer />
    </>
  )
}
