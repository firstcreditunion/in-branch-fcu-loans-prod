import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'verifycode'

export const initialState = {
  verificationcode: '',
  verificationSuccess: false,
}

const verifycodeSlice = createSlice({
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
      state.clientnumber = action.payload
    },
    setVerificationSuccess: (state, action) => {
      state.verificationSuccess = action.payload
    },
  },
})

export const verifycodeActions = verifycodeSlice.actions
export default verifycodeSlice
