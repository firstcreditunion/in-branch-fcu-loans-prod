import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'GlobalControl'

export const initialState = {
  guestSessionLoading: HTTP_STATUS.IDLE,
  guestSessionError: HTTP_STATUS.IDLE,
  guestSessionCurrentRequestId: null,

  guestSessionRefreshLoading: HTTP_STATUS.IDLE,
  guestSessionRefreshError: HTTP_STATUS.IDLE,
  guestSessionRefreshCurrentRequestId: null,

  secureSessionLoading: HTTP_STATUS.IDLE,
  secureSessionError: HTTP_STATUS.IDLE,
  secureSessionCurrentRequestId: null,

  secureSessionRefreshLoading: HTTP_STATUS.IDLE,
  secureSessionRefreshError: HTTP_STATUS.IDLE,
  secureSessionRefreshCurrentRequestId: null,

  skipRootNode: false,
  onMount: true,
  themeMode: 'light',

  onlineApplication: true,

  // Online
  guestSessionID: null,
  guestSessionExpiry: null,

  guestSessionRefreshID: null,
  guestSessionRefreshExpiry: null,

  // Secure
  secureSessionID: null,
  secureSessionExpiry: null,

  secureSessionRefreshID: null,
  secureSessionRefreshExpiry: null,
  secureClientDataIncluded: null,
  secureClientID: null,
  secureClientGeneralDetails: null,
  secureClientBankAccounts: null,

  currentStepCode: null,
  currentChildCode: null,

  isGuestIdle: false,

  refreshTokenIDOnline: null,
  refreshTokenExpiryOnline: null,

  refreshTokenIDSecure: null,
  refreshTokenExpirySecure: null,
}

const globalSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setSkipRootNode: (state, action) => {
      state.skipRootNode = action.payload
    },
    setOnMount: (state, action) => {
      state.onMount = action.payload
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload
    },
    setCurrentChildCode: (state, action) => {
      state.currentChildCode = action.payload
    },
    setcurrentStepCode: (state, action) => {
      state.currentStepCode = action.payload
    },

    // ************ Guest Token States ************ //

    // Initial
    setGuestSessionID: (state, action) => {
      state.guestSessionID = action.payload
    },
    setGuestSessionExpiry: (state, action) => {
      state.guestSessionExpiry = action.payload
    },
    // Refersh
    setGuestSessionRefreshID: (state, action) => {
      state.guestSessionRefreshID = action.payload
    },
    setGuestSessionRefreshExpiry: (state, action) => {
      state.guestSessionRefreshExpiry = action.payload
    },

    // ************ Guest Token States ************ //
    // Initial
    setSecureSessionID: (state, action) => {
      state.secureSessionID = action.payload
    },
    setSecureClientDataIncluded: (state, action) => {
      state.secureClientDataIncluded = action.payload
    },
    setSecureSessionExpirySecure: (state, action) => {
      state.secureSessionExpiry = action.payload
    },
    // Refresh
    setSecureSessionID: (state, action) => {
      state.secureSessionID = action.payload
    },
    setSecureSessionExpiry: (state, action) => {
      state.secureSessionExpiry = action.payload
    },
    setSecureClientID: (state, action) => {
      state.secureClientID = action.payload
    },
    setSecureClientGeneralDetails: (state, action) => {
      state.secureClientGeneralDetails = action.payload
    },
    setSecureClientBankAccounts: (state, action) => {
      state.secureClientBankAccounts = action.payload
    },
  },
})

export const globalActions = globalSlice.actions
export default globalSlice
