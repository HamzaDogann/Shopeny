import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';

import Basket from '../pages/BasketPage/Basket.jsx';
import FavoriteProducts from '../pages/FavoriteProductsPage/FavoriteProducts.jsx';
import HelpAndSupportRoutes from './HelpAndSupportRoutes.jsx';
import AccountRoutes from './AccountRoutes.jsx';
import HomePage from '../pages/HomePage/HomePage.jsx';
import CategoryProducts from '../pages/CategoryProductsPage/CategoryProducts.jsx';
import ProductDetails from "../pages/ProductDetailsPage/ProductDetails.jsx";
import PaymentProcess from "../pages/MainCheckoutPage/PaymentProcess.jsx";
import { FaArrowUp } from 'react-icons/fa6';
import { opacityAndTransformEffect } from '../shared/animations/animations.js';
import { motion } from 'framer-motion';
import zIndex from '@mui/material/styles/zIndex.js';

const AppRoutes = () => {
  const location = useLocation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!location.pathname.startsWith('/hesabim')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route path='/' element={<HomePage />} />
        <Route path='sepetim' element={<ProtectedRoute element={<Basket />} />} />
        <Route path='sepetim/odeme-islemleri' element={<ProtectedRoute element={<PaymentProcess />} />} />
        <Route path='favori-urunler' element={<ProtectedRoute element={<FavoriteProducts />} />} />
        <Route path="/hesabim/*" element={<ProtectedRoute element={<AccountRoutes />} />} />

        {/* Global Routes */}
        <Route path="/yardim-ve-destek/*" element={<HelpAndSupportRoutes />} />
        <Route path="/:categoryName" element={<CategoryProducts />} />
        <Route path="/:categoryName/:productName" element={<ProductDetails />} />
      </Routes>

      {/* Go Up Button*/}
      {showScrollToTop && (
        <motion.button {...opacityAndTransformEffect('y', 30, 0.3)}
          onClick={handleScrollToTop}
          style={scrollToTopButtonStyle}
        >
          <FaArrowUp />
        </motion.button>
      )}
    </>
  );
};

const scrollToTopButtonStyle = {
  position: 'fixed',
  fontSize: '20px',
  bottom: '20px',
  right: '20px',
  width: '49px',
  height: '49px',
  borderRadius: '50%',
  backgroundColor: '#496aee',
  backdropFilter:'blur(5px)',
  color: '#fff',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
  zIndex: '99999'
};
export default AppRoutes;
