import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'authentication'

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

  hasSoverignProfile: null,

  emailAddress: '',
  password: '',
  clientNumber: '',
  loginFailResult: null,
}

const authenticationSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setEmailAddress: (state, action) => {
      state.emailAddress = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setClientNumber: (state, action) => {
      state.clientNumber = action.payload
    },
    setHasSoverignProfile: (state, action) => {
      state.hasSoverignProfile = action.payload
    },
    setLoginFailResult: (state, action) => {
      state.loginFailResult = action.payload
    },
    clearSignInForm: (state, action) => {
      state.emailAddress = ''
      state.password = ''
      state.clientNumber = ''
      state.hasSoverignProfile = null
      state.loginFailResult = null
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

export const authenticationActions = authenticationSlice.actions
export default authenticationSlice
