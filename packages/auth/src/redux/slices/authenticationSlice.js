import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'authentication'

export const initialState = {
  emailAddress: '',
  password: '',
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
  },
})

export const authenticationActions = authenticationSlice.actions
export default authenticationSlice
