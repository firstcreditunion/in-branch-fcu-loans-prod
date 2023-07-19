import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'changepassword'

export const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  forgotPasswordStage: 1,
  passwordChangeStatus: false,
}

const changePasswordSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setCurrentPassword: (state, action) => {
      state.currentPassword = action.payload
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

export const changePasswordActions = changePasswordSlice.actions
export default changePasswordSlice
