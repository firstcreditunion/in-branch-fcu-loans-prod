import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/globalSlice'

const store = configureStore({
  reducer: {
    globalReducer: globalSlice.reducer,
  },
})

export default store
