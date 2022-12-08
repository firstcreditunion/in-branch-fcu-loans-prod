import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'
import axios from 'axios'

import { useDispatch } from 'react-redux'

import { useHistory } from 'react-router-dom'

const namespace = 'GlobalControl'
// const history = useHistory()

export const getGuestSessionOnlineApplication = createAsyncThunk(`${namespace}/getGuestSessionOnlineApplication`, async (guestSessionConfig) => {
  return await axios(guestSessionConfig)
    .then((response) => {
      // history.push()
      // Set Guest token timeout
      // setTimeout(() => {}, 900 * 1000 - 2000)

      const onlineTokenResposne = response?.data
      return null
    })
    .catch((error) => {
      return error
    })
})

export const getGuestSessionInternetBanking = createAsyncThunk(`${namespace}/getGuestSessionInternetBanking`, async (guestSessionConfig) => {
  return await axios(guestSessionConfig)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
})

export const getRefreshTokenOnline = createAsyncThunk(`${namespace}/getRefreshTokenOnline`, async (refreshTokenConfig) => {
  return await axios(refreshTokenConfig)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
})

export const getRefreshTokenSecure = createAsyncThunk(`${namespace}/getRefreshTokenSecure`, async (refreshTokenConfig) => {
  return await axios(refreshTokenConfig)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
})

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
  extraReducers: (builder) => {
    builder

      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GUEST <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

      // ***********************  Get guest token - Online Application *********************** //

      .addCase(getGuestSessionOnlineApplication.pending, (state, action) => {
        if (state.guestSessionLoading === 'IDLE') {
          state.guestSessionLoading = HTTP_STATUS.PENDING
          state.guestSessionCurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getGuestSessionOnlineApplication.fulfilled, (state, action) => {
        const { requestId } = action.meta
        // Check for current request ID and the new request id ***********************)
        if (state.guestSessionLoading === 'PENDING' && state.guestSessionCurrentRequestId === requestId) {
          state.guestSessionID = action.payload?.SID
          state.guestSessionExpiry = action.payload?.expires_in
          // Guest - Online Application Timer
          state.guestSessionLoading = HTTP_STATUS.IDLE
          state.guestSessionCurrentRequestId = null
        }
      })
      .addCase(getGuestSessionOnlineApplication.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.guestSessionLoading === 'PENDING' && state.guestSessionCurrentRequestId === requestId) {
          state.guestSessionLoading = 'IDLE'
          state.guestSessionError = action.error
          state.guestSessionCurrentRequestId = null
        }
      })

      // ***********************  Get refresh token - Online Application *********************** //

      .addCase(getRefreshTokenOnline.pending, (state, action) => {
        if (state.guestSessionRefreshLoading === 'IDLE') {
          state.guestSessionRefreshLoading = HTTP_STATUS.PENDING
          state.guestSessionRefreshCurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getRefreshTokenOnline.fulfilled, (state, action) => {
        const { requestId } = action.meta
        // Check for current request ID and the new request id ***********************
        if (state.guestSessionRefreshLoading === 'PENDING' && state.guestSessionRefreshCurrentRequestId === requestId) {
          state.guestSessionRefreshID = action.payload?.SID
          state.guestSessionRefreshExpiry = action.payload?.expires_in

          state.guestSessionRefreshLoading = HTTP_STATUS.IDLE
          state.guestSessionRefreshCurrentRequestId = null
        }
      })
      .addCase(getRefreshTokenOnline.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.guestSessionRefreshLoading === 'PENDING' && state.guestSessionRefreshCurrentRequestId === requestId) {
          state.guestSessionRefreshLoading = 'IDLE'
          state.guestSessionRefreshError = action.error
          state.guestSessionRefreshCurrentRequestId = null
        }
      })

      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SECURE - IB <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

      // ***********************  Get Secure token - Internet Banking *********************** //

      .addCase(getGuestSessionInternetBanking.pending, (state, action) => {
        if (state.secureSessionLoading === 'IDLE') {
          state.secureSessionLoading = HTTP_STATUS.PENDING
          state.secureSessionCurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getGuestSessionInternetBanking.fulfilled, (state, action) => {
        const { requestId } = action.meta
        // Check for current request ID and the new request id ***********************

        if (state.secureSessionLoading === 'PENDING' && state.secureSessionCurrentRequestId === requestId) {
          state.secureSessionID = action.payload?.data?.SID
          state.secureSessionExpiry = action.payload?.data?.expires_in

          state.secureSessionLoading = HTTP_STATUS.IDLE
          state.secureSessionCurrentRequestId = null
        }
      })
      .addCase(getGuestSessionInternetBanking.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.secureSessionLoading === 'PENDING' && state.secureSessionCurrentRequestId === requestId) {
          state.secureSessionLoading = 'IDLE'
          state.secureSessionError = action.error
          state.secureSessionCurrentRequestId = null
        }
      })

      // ***********************  Get refresh token - Internet Banking *********************** //

      .addCase(getRefreshTokenSecure.pending, (state, action) => {
        if (state.secureSessionRefreshLoading === 'IDLE') {
          state.secureSessionRefreshLoading = HTTP_STATUS.PENDING
          state.secureSessionRefreshCurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getRefreshTokenSecure.fulfilled, (state, action) => {
        const { requestId } = action.meta
        // Check for current request ID and the new request id ***********************
        if (state.secureSessionRefreshLoading === 'PENDING' && state.secureSessionRefreshCurrentRequestId === requestId) {
          state.secureSessionRefreshID = action.payload?.SID
          state.secureSessionRefreshExpiry = action.payload?.expires_in

          state.secureSessionRefreshLoading = HTTP_STATUS.IDLE
          state.secureSessionRefreshCurrentRequestId = null
        }
      })
      .addCase(getRefreshTokenSecure.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.secureSessionRefreshLoading === 'PENDING' && state.secureSessionRefreshCurrentRequestId === requestId) {
          state.secureSessionRefreshLoading = 'IDLE'
          state.secureSessionRefreshError = action.error
          state.secureSessionRefreshCurrentRequestId = null
        }
      })
  },
})

export const globalActions = globalSlice.actions
export default globalSlice
