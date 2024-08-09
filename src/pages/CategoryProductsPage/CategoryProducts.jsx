import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { validCategories } from "../../constants/categories";
import { MdFilterListAlt } from "react-icons/md";
import RadioButton from "../../shared/helpers/RadioButton";
import CategoryFilterBar from '../../components/CategoryProductPageComponents/CategoryFilterBar';
import CategoryProductList from '../../components/CategoryProductPageComponents/CategoryProductList';
import { useDispatch, useSelector } from 'react-redux';
import "./CategoryProducts.scss";
import { getCategoryProducts } from '../../store/thunks/Products/categoryProductsThunk';

function CategoryProducts() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.categoryProducts);
  const productsInState = products[categoryName] || [];

  if (!validCategories.includes(categoryName)) {
    return <Navigate to="/" />;
  }

  const [sortOption, setSortOption] = useState('priceAsc');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  useEffect(() => {
    if (!productsInState.length) {
      dispatch(getCategoryProducts(categoryName));
    }
  }, [dispatch, categoryName, productsInState.length]);

  console.log(categoryName, " yenilendi");
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const showFilterMenu = () => {
    setIsFilterVisible(true);
  };

  const hideFilterMenu = () => {
    setIsFilterVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1100);
      if (window.innerWidth > 1100) {
        setIsFilterVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='category-products-box'>
      <div className='top-filter-options-box'>
        <div className='stock-and-sorting-box'>
          <div className='is-stock-box'>
            <RadioButton />
            <span>Stoktakiler</span>
          </div>

          <select name="sorting" id="sorting" value={sortOption} onChange={handleSortChange}>
            <option value="priceAsc">Fiyata Göre Artan</option>
            <option value="priceDesc">Fiyata Göre Azalan</option>
            <option value="oldToNew">Eskiden Yeniye</option>
            <option value="newToOld">Yeniden Eskiye</option>
          </select>
        </div>

        {isMobile && (
          <button className='mobile-filter-btn' onClick={showFilterMenu}>
            <MdFilterListAlt className='filter-icon' />
            <span>Filtreleme Seçenekleri</span>
          </button>
        )}
      </div>

      <div className='category-products'>
        <div className='category-filter-bar' style={{ display: isMobile && isFilterVisible ? 'flex' : !isMobile ? 'flex' : 'none' }}>
          <CategoryFilterBar closeFilterMenuFunc={hideFilterMenu} />
        </div>
        <div className='category-products-bar'>
          <CategoryProductList products={productsInState} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
