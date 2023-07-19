import React, { useState, useContext, useEffect } from 'react'
import { LoginContext } from './UserAccount'
import { Button, Typography } from '@mui/material'

export default () => {
  const [status, setStatus] = useState(false)

  const { getUserSession, userLogout } = useContext(LoginContext)

  useEffect(() => {
    getUserSession()
      .then((session) => {
        console.log('Session User Session:', session)
        setStatus(true)
      })
      .catch((err) => {
        console.log('Session Error User Session: ', err)
      })
  }, [])

  return <Typography>{status ? <Button onClick={userLogout}>Log Out</Button> : 'Please Login below'}</Typography>
}
