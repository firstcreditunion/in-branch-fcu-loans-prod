import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'signup'

export const checkSovereignProfile = createAsyncThunk(`${namespace}/checkSovereignProfile`, async (sovProfileConfig) => {
  return await axios(sovProfileConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const initialState = {
  sovProfileloading: HTTP_STATUS.IDLE,
  sovProfileerror: HTTP_STATUS.IDLE,
  sovProfilecurrentRequestId: null,

  onSubmitSignUpForm: null,

  emailAddress: '',
  password: '',
  verifyPassword: '',
  clientnumber: '',

  domain: '@firstcu.co.nz',
  hasSoverignProfile: null,

  cognitoError: null,
  cognitoErrorName: null,
  cognitoErrorStack: null,

  congnitoResponseUsername: null,
  congnitoResponseuserSub: null,
}

const signupSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setEmailAddress: (state, action) => {
      // console.log('EMAIl ADDRESS Action payload: ', action.payload)
      state.emailAddress = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setVerifyPassword: (state, action) => {
      state.verifyPassword = action.payload
    },
    setClientNumber: (state, action) => {
      state.clientnumber = action.payload
    },
    setHasSoverignProfile: (state, action) => {
      state.hasSoverignProfile = action.payload
    },
    clearSignUpForm: (state, action) => {
      state.emailAddress = ''
      state.password = ''
      state.verifyPassword = ''
      state.clientnumber = ''
      state.hasSoverignProfile = null
      state.signUpFailResult = null
    },

    setCognitoError: (state, action) => {
      state.cognitoError = action.payload
    },
    setCognitoErrorName: (state, action) => {
      state.cognitoErrorName = action.payload
    },
    setCognitoErrorStack: (state, action) => {
      state.cognitoErrorStack = action.payload
    },

    setCongnitoResponseUsername: (state, action) => {
      state.congnitoResponseUsername = action.payload
    },
    setCongnitoResponseuserSub: (state, action) => {
      state.congnitoResponseuserSub = action.payload
    },
    setOnSubmitSignUpForm: (state, action) => {
      state.onSubmitSignUpForm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSovereignProfile.pending, (state, action) => {
        if (state.sovProfileloading === 'IDLE') {
          state.sovProfileloading = HTTP_STATUS.PENDING
          state.sovProfilecurrentRequestId = action.meta.requestId
        }
      })
      .addCase(checkSovereignProfile.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.sovProfileloading === 'PENDING' && state.sovProfilecurrentRequestId === requestId) {
          state.sovProfileloading = HTTP_STATUS.IDLE

          state.hasSoverignProfile = action.payload?.axiosResponse?.Response
        }
      })
      .addCase(checkSovereignProfile.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.sovProfileloading === 'PENDING' && state.sovProfilecurrentRequestId === requestId) {
          state.sovProfileloading = 'IDLE'
          state.sovProfileerror = action.error
          state.sovProfilecurrentRequestId = null
        }
      })
  },
})

export const signupActions = signupSlice.actions
export default signupSlice
