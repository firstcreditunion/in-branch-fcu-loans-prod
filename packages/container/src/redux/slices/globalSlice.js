import { createSlice } from '@reduxjs/toolkit'

const namespace = 'GlobalStates'

export const initialState = {
  themeMode: 'light',
  signinInstance: null,
  secureLoginSessionID: null,
  secureLoginSessionExpiry: null,
  secureLoginSessionResposneStatus: null,
}

const globalSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload
    },
    setSigninInstance: (state, action) => {
      state.signinInstance = action.payload
    },
    setSecureSessionID: (state, action) => {
      state.secureLoginSessionID = action.payload
    },
    setSecureSessionExpiry: (state, action) => {
      state.secureLoginSessionExpiry = action.payload
    },
    setSecureLoginSessionResposneStatus: (state, action) => {
      state.secureLoginSessionResposneStatus = action.payload
    },
  },
})

export const globalActions = globalSlice.actions
export default globalSlice
