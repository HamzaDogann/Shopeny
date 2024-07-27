import { configureStore } from '@reduxjs/toolkit'
import preLoaderReducer from './features/PreLoader/preLoaderSlice'
import authReducer from './features/auth/authSlice'
import modalReducer from './features/ConfirmationModal/Modal'

export const store = configureStore({
  reducer: {
    preLoader: preLoaderReducer,
    auth: authReducer,
    modal : modalReducer,
  },
})