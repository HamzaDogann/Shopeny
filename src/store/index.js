import { configureStore } from '@reduxjs/toolkit'
//Reducers
import authReducer from './slices/Auth/authSlice'
import modalReducer from './slices/confirmationModalSlice'
import basketReducer from './slices/Basket/basketSlice'
import ordersReducer from './slices/User/ordersSlice'
import addressesReducer from './slices/User/addressesSlice'
import preLoaderReducer from './slices/preLoaderSlice'
import searchProductsReducer from './slices/searchProductsSlice'
import productDetailsReducer from './slices/Products/productDetailsSlice'
import accountDetailsReducer from './slices/User/accountDetailsSlice'
import PaymentProcessReducer from './slices/PaymentProcess/PaymentProcessSlice'
import popularProductsReducer from './slices/Products/popularProductsSlice'
import favoriteProductsReducer from './slices/User/favoriteProductsSlice'
import categoryProductsReducer from './slices/Products/categoryProductsSlice'
import filteredCategoryProductsReducer from './slices/Products/filteredCategoryProductsSlice'

export const store = configureStore({
  reducer: {
    preLoader: preLoaderReducer,
    auth: authReducer,
    modal: modalReducer,
    addresses: addressesReducer,
    categoryProducts: categoryProductsReducer,
    filteredCategoryProducts: filteredCategoryProductsReducer,
    productDetails: productDetailsReducer,
    popularProducts: popularProductsReducer,
    searchProducts: searchProductsReducer,
    favoriteProducts: favoriteProductsReducer,
    accountDetails: accountDetailsReducer,
    basket: basketReducer,
    paymentProcess: PaymentProcessReducer,
    orders: ordersReducer
  },
})