import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Basket from '../pages/BasketPage/Basket';
import FavoriteProducts from '../pages/FavoriteProductsPage/FavoriteProducts';
import Account from '../pages/AccountPage/Account';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../pages/HomePage/HomePage';

const AppRoutes = () => (
  <>
  
  <Routes>
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