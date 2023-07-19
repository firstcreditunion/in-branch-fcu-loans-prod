import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'forgotpassword'

export const initialState = {
  domain: '@firstcu.co.nz',
  emailaddress: '',
  verificationCode: '',
  newPassword: '',
  confirmPassword: '',
  forgotPasswordStage: 1,
  passwordChangeStatus: false,
  forgotPasswordRequestError: '',
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

    setForgotPasswordRequestError: (state, action) => {
      state.forgotPasswordRequestError = action.payload
    },
    clearForgotPasswordForm: (state, action) => {
      state.emailaddress = ''
      state.verificationCode = ''
      state.newPassword = ''
      state.confirmPassword = ''
      state.forgotPasswordStage = 1
      state.passwordChangeStatus = false
      state.forgotPasswordRequestError = ''
    },
  },
})

export const forgotPasswordActions = forgotPasswordSlice.actions
export default forgotPasswordSlice
