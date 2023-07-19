import React, { useState, useEffect, useContext } from 'react'
import { LoginContext } from '../../cognito/UserAccount'

const CognitoMFA = () => {
  const { getUserSession } = useContext(LoginContext)

  return <div>CognitoMFA</div>
}

export default CognitoMFA
