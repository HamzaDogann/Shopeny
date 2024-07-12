import { configureStore } from '@reduxjs/toolkit'
import preLoaderReducer from './features/PreLoader/preLoaderSlice'
import authReducer from './features/auth/authSlice'

export const store = configureStore({
  reducer: {
    preLoader: preLoaderReducer,
    auth: authReducer
  },
})