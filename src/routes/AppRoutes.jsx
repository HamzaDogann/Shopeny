import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Basket from '../pages/BasketPage/Basket.jsx';
import FavoriteProducts from '../pages/FavoriteProductsPage/FavoriteProducts.jsx';

import HelpAndSupportRoutes from './HelpAndSupportRoutes.jsx';
import AccountRoutes from './AccountRoutes';

import HomePage from '../pages/HomePage/HomePage';
import CategoryProducts from '../pages/CategoryProductsPage/CategoryProducts';
import ProductDetails from "../pages/ProductDetailsPage/ProductDetails.jsx"

const AppRoutes = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='sepetim' element={<ProtectedRoute element={<Basket />} />} />
        <Route path='favori-urunler' element={<ProtectedRoute element={<FavoriteProducts />} />} />
        <Route path="/hesabim/*" element={<ProtectedRoute element={<AccountRoutes />} />} />
        <Route path="/yardim-ve-destek/*" element={<HelpAndSupportRoutes />} />
        <Route path="/:categoryName" element={<CategoryProducts />} />
        <Route path="/:categoryName/:productName" element={<ProductDetails />} />
        {/* Diğer korumalı rotalar */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default AppRoutes;

