import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'searchclientnumber'

export const getClientGeneralDetails = createAsyncThunk(`${namespace}/getClientGeneralDetails`, async (clientGeneralDetailsConfig) => {
  return await axios(clientGeneralDetailsConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
})

export const initialState = {
  loading: HTTP_STATUS.IDLE,
  currentRequestId: null,
  error: null,

  clientNumber: '',
}

const clientSearchSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setClientNumber: (state, action) => {
      state.clientNumber = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientGeneralDetails.pending, (state, action) => {
        if (state.loading === 'IDLE') {
          state.loading = HTTP_STATUS.PENDING
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(getClientGeneralDetails.fulfilled, (state, action) => {
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = HTTP_STATUS.IDLE
          // console.log('General Client Details', action.payload)
        }
      })
      .addCase(getClientGeneralDetails.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = 'IDLE'
          state.error = action.error
          state.currentRequestId = null
        }
      })
  },
})

export const clientSearchActions = clientSearchSlice.actions
export default clientSearchSlice
