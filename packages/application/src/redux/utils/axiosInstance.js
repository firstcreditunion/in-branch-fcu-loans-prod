import axios from 'axios'

export const BASE_URL_APP = 'https://t2ohklk0gc.execute-api.ap-southeast-2.amazonaws.com/TEST'
export const BASE_URL_AUTH = 'https://45ftmoapxl.execute-api.ap-southeast-2.amazonaws.com/TEST_AUTH'

export const HTTP_STATUS = Object.freeze({
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
})

const axiosInstance = axios.create({
  baseURL: 'https://iff3jmjz7e.execute-api.ap-southeast-2.amazonaws.com/dev',
  timeout: 7000,
  headers: { Accept: 'application/json' },
})

export default axiosInstance
