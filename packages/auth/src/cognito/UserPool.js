import React from 'react'

//* AWS Cognito
import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: 'ap-southeast-2_uLcsxGJyZ',
  ClientId: '1aeodb1nn5mrals08vnj85rft4',
}

export default new CognitoUserPool(poolData)
