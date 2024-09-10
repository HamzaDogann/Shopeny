import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';

// Lazy loaded components
const HelpAndSupportRoutes = lazy(() => import('./HelpAndSupportRoutes.jsx'));
const PaymentProcess = lazy(() => import('../pages/MainCheckoutPage/PaymentProcess.jsx'));

// Normal components
import Basket from '../pages/BasketPage/Basket.jsx';
import FavoriteProducts from '../pages/FavoriteProductsPage/FavoriteProducts.jsx';
import AccountRoutes from "./AccountRoutes.jsx"
import HomePage from '../pages/HomePage/HomePage.jsx';
import CategoryProducts from '../pages/CategoryProductsPage/CategoryProducts.jsx';
import ProductDetails from '../pages/ProductDetailsPage/ProductDetails.jsx';

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/hesabim')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <Routes>
      {/* Directly loaded routes */}
      <Route path='/' element={<HomePage />} />
      <Route path="/:categoryName" element={<CategoryProducts />} />
      <Route path="/:categoryName/:productName" element={<ProductDetails />} />

      <Route path='sepetim' element={<ProtectedRoute element={<Basket />} />} />
      <Route path='favori-urunler' element={<ProtectedRoute element={<FavoriteProducts />} />} />
      <Route path="/hesabim/*" element={<ProtectedRoute element={<AccountRoutes />} />} />

      {/* Lazy loaded routes*/}
      < Route
        path='sepetim/odeme-islemleri'
        element={
          <Suspense fallback={<div style={{ height: "600px", width: "100%" }}></div>}>
            <ProtectedRoute element={<PaymentProcess />} />
          </Suspense>
        }
      />
      <Route
        path="/yardim-ve-destek/*"
        element={
          <Suspense fallback={<div style={{ height: "600px", width: "100%" }}></div>}>
            <HelpAndSupportRoutes />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
