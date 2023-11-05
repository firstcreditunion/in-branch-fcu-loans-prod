//* Endpoints
const OCC_BASE_URL_APP = 'https://x8cqelk6q6.execute-api.ap-southeast-2.amazonaws.com'
const OCC_BASE_URL_APP_LOAN_CALC = 'https://6s6pe9scql.execute-api.ap-southeast-2.amazonaws.com'

const location_origin = window.location.origin

//* Resources - Application
export const BASE_URL_LOCAL_APP = `${OCC_BASE_URL_APP}/${getCloudFrontEnvironment()}`
export const BASE_URL_AWS_APP = `${OCC_BASE_URL_APP}/${getCloudFrontEnvironment()}`

export const BASE_URL_LOCAL_APP_LOAN_CALC = `${OCC_BASE_URL_APP_LOAN_CALC}/${getCloudFrontEnvironmentLoanCalc()}`
export const BASE_URL_AWS_APP_LOAN_CALC = `${OCC_BASE_URL_APP_LOAN_CALC}/${getCloudFrontEnvironmentLoanCalc()}`

export const HTTP_STATUS = Object.freeze({
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  IDLE: 'IDLE',
})

export const AXIOS_NETWOR_ERROR = Object.freeze({
  CODE: 'ERR_NETWORK',
  MESSAGE: 'Network Error',
})

export const SUBMISSION_STATUS = Object.freeze({
  CODE: 200,
})

export const processNodeEnv = () => {

  return process.env.NODE_ENV
}

// export const cognitoUserDetails = () => {

//   const userPoolId = process.env.REACT_APP_USER_POOL_ID_TEST
//   const clientId = process.env.REACT_APP_CLIENT_ID_TEST

//   console.log('Pool ID: ', userPoolId)
//   console.log('Client ID: ', clientId)

//   return { userPoolId: userPoolId, clientId: clientId }
// }

export function getCloudFrontEnvironment() {
  if (location_origin === 'https://drpef2o7h0f6v.cloudfront.net' || location_origin === 'https://portal.firstcreditunion.co.nz') {
    return 'Member-Only-Prod'
  }
  if (location_origin === 'http://localhost:3001' || location_origin === 'https://d32y8rruwsttdk.cloudfront.net') {
    return 'Member-Only-Test'
  }
}

export function getCloudFrontEnvironmentLoanCalc() {
  if (location_origin === 'https://drpef2o7h0f6v.cloudfront.net' || location_origin === 'https://portal.firstcreditunion.co.nz') {
    return 'SS-PROD'
  }
  if (location_origin === 'http://localhost:3001' || location_origin === 'https://d32y8rruwsttdk.cloudfront.net') {
    return 'SS-DEV'
  }
}