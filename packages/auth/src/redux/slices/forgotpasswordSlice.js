import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'forgotpassword'

export const initialState = {
  emailaddress: '',
  verificationCode: '',
  newPassword: '',
  confirmPassword: '',
  forgotPasswordStage: 1,
  passwordChangeStatus: false,
}

const forgotPasswordSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setEmailAddress: (state, action) => {
      state.emailaddress = action.payload
    },
    setVerificationCode: (state, action) => {
      state.verificationCode = action.payload
    },
    setNewPassword: (state, action) => {
      state.newPassword = action.payload
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload
    },
    setForgotPasswordStage: (state, action) => {
      state.forgotPasswordStage = action.payload
    },
    setPasswordChangeStatus: (state, action) => {
      state.passwordChangeStatus = action.payload
    },
  },
})

export const forgotPasswordActions = forgotPasswordSlice.actions
export default forgotPasswordSlice
