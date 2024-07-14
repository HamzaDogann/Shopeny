import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthProtectedRoute from './AuthProtectedRoute';
import SignIn from '../pages/AuthPages/SignIn';
import SignUp from '../pages/AuthPages/SignUp';
import ResetPassword from '../pages/AuthPages/ResetPassword';
import Basket from '../pages/BasketPage/Basket';
import FavoriteProducts from '../pages/FavoriteProductsPage/FavoriteProducts';
import Account from '../pages/AccountPage/Account';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../pages/HomePage/HomePage';

const AppRoutes = () => (
  <>
  
  <Routes>
    <Route path="giris-yap" element={<AuthProtectedRoute element={<SignIn />} />} />
    <Route path="uye-ol" element={<AuthProtectedRoute element={<SignUp />} />} />
    <Route path="sifre-yenileme" element={<AuthProtectedRoute element={<ResetPassword />} />} />
    <Route path='/' element={<HomePage />} />
    <Route path='sepetim' element={<ProtectedRoute element={<Basket />} />} />
    <Route path='favori-urunler' element={<ProtectedRoute element={<FavoriteProducts />} />} />
    <Route path='hesabim' element={<ProtectedRoute element={<Account />} />} />
    {/* Diğer korumalı rotalar */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  <Outlet />
  </>
);

export default AppRoutes;