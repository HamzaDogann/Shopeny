import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import PreLoader from '../../components/PreLoader/PreLoader';
import Pagination from '@mui/material/Pagination';
import { PiHeartStraightFill } from "react-icons/pi";

import ProductCard from '../../shared/components/ProductCard/ProductCard';
import { customErrorToast, customSuccessToast } from '../../shared/utils/CustomToasts';
import ConfirmationModal from '../../shared/components/ConfirmationModal/ConfirmationModal';
import { opacityAndTransformEffect } from '../../shared/animations/animations';

import { getUserId } from '../../store/utils/getUserId';
import { showModal } from '../../store/slices/confirmationModalSlice';
import { clearFavoriteProducts, fetchProducts } from '../../store/thunks/User/favoriteProductThunk';

import "./FavoriteProducts.scss";


function FavoriteProducts() {

  const userId = getUserId();
  const dispatch = useDispatch();

  //--------------------------States-----------------------------

  const { favoriteProductsRef, favoriteProducts, loading, error } = useSelector(state => state.favoriteProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //-----------------------Data Actions---------------------------

  const areProductsDifferent = (refArray, productArray) => {
    if (refArray.length !== productArray.length) {
      return true;
    }
  };

  //!Get Favorite Products
  useEffect(() => {
    if (favoriteProductsRef.length > 0 && areProductsDifferent(favoriteProductsRef, favoriteProducts)) {
      dispatch(fetchProducts(favoriteProductsRef));
    }
  }, [dispatch, favoriteProductsRef]);


  //!Clear Favorite Products

  const handleClearProcess = () => {
    dispatch(showModal({
      message: "Favori ürünlerini silmek istediğine emin misin?",
      confirmText: "Evet",
      cancelText: "Hayır"
    }));
  }

  const handleClearFavoriteProducts = () => {
    try {
      dispatch(clearFavoriteProducts({ userId }));
      customSuccessToast("Favori ürünler kaldırıldı")
    }
    catch {
      customErrorToast("Favori ürünler kaldırılamadı")
    }
  }

  //--------------------------Paginations-----------------------------

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(5);
      } else {
        setItemsPerPage(10);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = favoriteProducts.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentItems.length === 0 && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [currentItems, currentPage]);

  
  if (error) {
    return <div>Beklenmedik bir hata meydana geldi</div>;
  }

  //--------------------------JSX-----------------------------

  return (
    <div className='favorite-product-general-box'>
      <div className="top-box">

        <motion.div {...opacityAndTransformEffect('x', -70, 0.7)} className="favorite-title">
          <PiHeartStraightFill className='favorite-icon' />
          <p>Favori Ürünlerim</p>
        </motion.div>

        {favoriteProducts.length > 0 &&
          <button onClick={handleClearProcess} className='clear-favorites-btn'>
            Tümünü Kaldır
          </button>
        }
      </div>
      <div className='favorite-products-box'>
        {loading ?
          <div style={{ height: "600px" }}>
            <PreLoader />
          </div>
          :
          favoriteProducts.length > 0 ? currentItems.map(product => (
            <motion.div {...opacityAndTransformEffect('y', 30, 0.6)} key={product.categoryName + product.Id}>
              <ProductCard product={product} />
            </motion.div>
          )) :
            !loading && (
              <motion.div {...opacityAndTransformEffect('y', 30, 0.6)} className='there-are-no-content-box'>
                Favorilere eklenmiş bir ürün bulunmuyor.
                <Link to={"/"}>Ürünleri Keşfet</Link>
              </motion.div>
            )
        }

      </div>
      {favoriteProducts.length > 0 && Math.ceil(favoriteProducts.length / itemsPerPage) > 1 && (
        <div className='pagination-box'>
          <Pagination
            size="large"
            count={Math.ceil(favoriteProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
      {/* Confirmation Modal */}
      <ConfirmationModal onConfirm={handleClearFavoriteProducts} />
    </div>
  );
}

export default FavoriteProducts;
