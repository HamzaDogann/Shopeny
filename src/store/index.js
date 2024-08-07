import { configureStore } from '@reduxjs/toolkit'
import preLoaderReducer from './slices/preLoaderSlice'
import authReducer from './slices/Auth/authSlice'
import modalReducer from './slices/confirmationModalSlice'
import addressesReducer from './slices/User/addressesSlice'

export const store = configureStore({
  reducer: {
    preLoader: preLoaderReducer,
    auth: authReducer,
    modal : modalReducer,
    addresses: addressesReducer,
  },
})