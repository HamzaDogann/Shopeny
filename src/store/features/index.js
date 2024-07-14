import { configureStore } from '@reduxjs/toolkit'
import preLoaderReducer from './PreLoader/preLoaderSlice'
import authReducer from './auth/authSlice'

export const store = configureStore({
  reducer: {
    preLoader: preLoaderReducer,
    auth: authReducer
  },
})