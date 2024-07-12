import { configureStore } from '@reduxjs/toolkit'
import preLoaderReducer from './slices/preLoaderSlice'

export const store = configureStore({
  reducer: {
    preLoader: preLoaderReducer
  },
})