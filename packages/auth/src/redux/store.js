import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/globalSlice'
import authenticationSlice from './slices/authenticationSlice'
import signupSlice from './slices/signupSlice'
import forgotpasswordSlice from './slices/forgotpasswordSlice'
import changepasswordSlice from './slices/changepasswordSlice'
import verifyCodeSlice from './slices/verifyCodeSlice'

const store = configureStore({
  reducer: {
    globalReducer: globalSlice.reducer,
    authenticationReducer: authenticationSlice.reducer,
    signupReducer: signupSlice.reducer,
    forgotpasswordReducer: forgotpasswordSlice.reducer,
    changepasswordReducer: changepasswordSlice.reducer,
    verifyCodeReducer: verifyCodeSlice.reducer,
  },
})

export default store
