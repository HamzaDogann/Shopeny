import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiHeartStraightFill } from "react-icons/pi";
import Pagination from '@mui/material/Pagination';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteProductsRef, fetchProducts } from '../../store/thunks/User/favoriteProductThunk';
import "./FavoriteProducts.scss";
import { getUserId } from '../../store/utils/getUserId';
import { CircularProgress, Divider } from '@mui/material';
import { startLoading, stopLoading } from '../../store/slices/preLoaderSlice';

function FavoriteProducts() {
  
  const dispatch = useDispatch();
  const { favoriteProductsRef, favoriteProducts, loading, error } = useSelector(state => state.favoriteProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const userId = getUserId();

  useEffect(() => {
    dispatch(fetchFavoriteProductsRef({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (favoriteProductsRef.length > 0) {
      dispatch(startLoading());
      dispatch(fetchProducts(favoriteProductsRef));
      dispatch(stopLoading());
    }
  }, [dispatch, favoriteProductsRef]);

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


  if (error) {
    return <div>Beklenmedik bir hata meydana geldi</div>
  }

  return (
    <div className='favorite-product-general-box'>
      <div className="top-box">
        <div className="favorite-title">
          <PiHeartStraightFill className='favorite-icon' />
          <p>Favori Ürünlerim</p>
        </div>
        {favoriteProducts.length > 0 &&
          <button className='clear-favorites-btn'>
            Tümünü Kaldır
          </button>
        }
      </div>
      <div className='favorite-products-box'>
        {favoriteProducts.length > 0 ? currentItems.map(product => (
          <ProductCard key={product.Id} product={product} />
        )) :
          !loading && (
            <div className='there-are-no-content-box'>
              Favorilere eklenmiş bir ürün bulunmuyor.
              <Link to={"/"}>Ürünleri Keşfet</Link>
            </div>
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
    </div>
  );
}

export default FavoriteProducts;
