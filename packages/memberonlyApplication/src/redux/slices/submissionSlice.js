import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'
import axios from 'axios'

const namespace = 'submissionSlice'

export const submitLoanApplication = createAsyncThunk(`${namespace}/submitLoanApplication`, async (submitConfig) => {
  return await axios(submitConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const initialState = {
  loading: HTTP_STATUS.IDLE,
  error: HTTP_STATUS.IDLE,
  currentRequestId: null,

  applicationNumber: null,
  serverError: null,

  skipRootNode: false,
  onMount: true,
  themeMode: 'light',
}

const submissionSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitLoanApplication.pending, (state, action) => {
        if (state.loading === 'IDLE') {
          state.loading = HTTP_STATUS.PENDING
          state.currentRequestId = action.meta.requestId
        }
        // console.log('PENDING PAYLOAD: ', action.payload)
      })
      .addCase(submitLoanApplication.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = HTTP_STATUS.IDLE
          const axiosResponse = action.payload?.axiosResponse
          const submissionAttributes = action.payload?.axiosResponse?.body?.data?.attributes

          state.applicationNumber = submissionAttributes?.applicationRef
          state.serverError = axiosResponse
        }
        // console.log('FULFILLED PAYLOAD: ', action.payload)
      })
      .addCase(submitLoanApplication.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = 'IDLE'
          state.error = action.error
          state.currentRequestId = null

          // console.log('Rejected Error: ', action.error)
          // console.log('Rejected Payload: ', action.payload)
          // console.log('Rejected meta: ', action.meta)
          // console.log('Rejected Type: ', action.type)
        }
        // console.log('ERROR PAYLOAD: ', action.payload)
      })
  },
})

export const submissionActions = submissionSlice.actions
export default submissionSlice
