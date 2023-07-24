import { Typography } from '@mui/material'
import React, { createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//* AWS Cognito
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import UserPool from './UserPool'

import { authenticationActions } from '../redux/slices/authenticationSlice'

const LoginContext = createContext()

const UserAccount = (props) => {
  // Function to check if the user is logged in (Session for user)

  console.log('Props Set Cognito Token', props?.setCognitoToken)

  const getUserSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser()
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject()
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err)
                } else {
                  const results = {}

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute
                    results[Name] = Value
                  }

                  resolve(results)
                }
              })
            })
            // console.log('User: ', user)
            // console.log('Session: ', session)
            // console.log('Attributes: ', attributes)
            resolve({
              user,
              ...session,
              ...attributes,
            })
          }
        })
      } else {
        reject()
      }
    })
  // Function to let the user login
  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: Username,
        Pool: UserPool,
      })
      const authDetails = new AuthenticationDetails({
        Username: Username,
        Password: Password,
      })

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data)

          console.log('Login Data: ', data)
          const sessionJwt = data?.accessToken?.jwtToken
          const sessionTime = data?.idToken?.payload?.auth_time
          const sessionExpiry = data?.idToken?.payload?.exp
          const sessionIat = data?.idToken?.payload?.iat

          const sessionDetails = { jwt: sessionJwt, auth_time: sessionTime, expiry: sessionExpiry, iat: sessionIat }

          props?.setCognitoToken(sessionDetails)

          return data
        },
        onFailure: (err) => {
          reject(err)
          console.log('Login Error: ', err)
          return err
        },
        newPasswordRequired: (data) => {},
        // mfaSetup: (challengeName, challengeParameters) => {
        //   user.associateSoftwareToken(this)
        // },
      })

      return user
    })
  }

  // const userAttributes = async (Username, Password) => {
  //   await new Promise((resolve, reject) => {
  //     const user = new CognitoUser({
  //       Username: Username,
  //       Pool: UserPool,
  //     })
  //     const authDetails = new AuthenticationDetails({
  //       Username: Username,
  //       Password: Password,
  //     })

  //     user.authenticateUser(authDetails, {
  //       onSuccess: (data) => {
  //         console.log('On Success: ', data)
  //         resolve(data)
  //       },
  //       onFailure: (err) => {
  //         console.log('On Failure: ', err)
  //         reject(err)
  //       },
  //       newPasswordRequired: (data) => {
  //         console.log('New Password Required: ', data)
  //       },
  //       // mfaSetup: (challengeName, challengeParameters) => {
  //       //   user.associateSoftwareToken(this)
  //       // },
  //     })

  //     return user
  //   })
  // }

  const userLogout = () => {
    const user = UserPool.getCurrentUser()

    if (user) {
      user.signOut()
    }
  }

  return (
    <LoginContext.Provider
      value={{
        authenticate,
        getUserSession,
        userLogout,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  )
}

export { LoginContext, UserAccount }
