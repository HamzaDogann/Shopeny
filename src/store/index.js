import { configureStore } from '@reduxjs/toolkit'
import preLoaderReducer from './slices/preLoaderSlice'
import authReducer from './slices/Auth/authSlice'
import modalReducer from './slices/confirmationModalSlice'
import addressesReducer from './slices/User/addressesSlice'
import categoryProductsReducer from './slices/Products/categoryProductsSlice'
import filteredCategoryProductsReducer from './slices/Products/filteredCategoryProductsSlice'
import productDetailsReducer from './slices/Products/productDetailsSlice'

export const store = configureStore({
  reducer: {
    preLoader: preLoaderReducer,
    auth: authReducer,
    modal: modalReducer,
    addresses: addressesReducer,
    categoryProducts: categoryProductsReducer,
    filteredCategoryProducts: filteredCategoryProductsReducer,
    productDetails: productDetailsReducer
  },
})