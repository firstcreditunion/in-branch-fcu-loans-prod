import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/globalSlice'
import authenticationSlice from './slices/authenticationSlice'

const store = configureStore({
  reducer: {
    globalReducer: globalSlice.reducer,
    authenticationReducer: authenticationSlice.reducer,
  },
})

export default store
