import React, { useState, useEffect } from 'react';
import "./FavoriteProducts.scss";
import { BsStars } from "react-icons/bs";
import Pagination from '@mui/material/Pagination';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';

// Örnek ürün verisi
const productList = Array.from({ length: 15 }, (_, i) => ({ id: i, name: `Product ${i + 1}` }));

function FavoriteProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = productList.length;

  //Favori Ürün olup olmadgığına göre conditional rendering yapıcaz
  //!Denemelik
  const favoriteProducts = false;

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(5);
      } else {
        setItemsPerPage(10);
      }
    };

    updateItemsPerPage(); // İlk yükleme
    window.addEventListener('resize', updateItemsPerPage); // Resize event'i dinleyici

    return () => window.removeEventListener('resize', updateItemsPerPage); // Temizlik
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

  // Gösterilecek ürünlerin başlangıç ve bitiş indekslerini hesapla
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = productList.slice(startIndex, endIndex);

  console.log("Favorite Produc component Rendered");

  return (
    <div className='favorite-product-general-box'>
      <div className="top-box">
        <div className="favorite-title">
          <BsStars className='favorite-icon' />
          <p>Favori Ürünlerim</p>
        </div>
        {favoriteProducts &&
          <button className='clear-favorites-btn'>
            Tümünü Kaldır
          </button>
        }
      </div>
      <div className='favorite-products-box'>
        {favoriteProducts ? currentItems.map(product => (
          <ProductCard key={product.id} product={product} />
        )) :
          <div className='there-are-no-content-box'>
            Favorilere eklenmiş bir ürün bulunmuyor.
            <Link to={"/"}>Ürünleri Keşfet</Link>
          </div>
        }
      </div>
      {favoriteProducts ? Math.ceil(totalItems / itemsPerPage) > 1 && (
        <div className='pagination-box'>
          <Pagination
            size="large"
            count={Math.ceil(totalItems / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
}

export default FavoriteProducts;
