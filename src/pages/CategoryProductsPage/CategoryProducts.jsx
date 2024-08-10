import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { validCategories } from "../../constants/categories";
import { useDispatch, useSelector } from 'react-redux';
import { MdFilterListAlt } from "react-icons/md";
import { filterProducts } from '../../store/utils/filterUtils';
import { getCategoryProducts } from '../../store/thunks/Products/categoryProductsThunk';
import { setBrands, setColors, setIsStock, setPriceRange, setRating, setSortOption } from '../../store/slices/Products/categoryProductsSlice';
import { clearFilters } from "../../store/slices/Products/categoryProductsSlice.js"

import CategoryFilterBar from '../../components/CategoryProductPageComponents/CategoryFilterBar';
import CategoryProductList from '../../components/CategoryProductPageComponents/CategoryProductList';
import RadioButton from '../../shared/helpers/RadioButton';
import "./CategoryProducts.scss";

function CategoryProducts() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { categoryName } = useParams();


  if (!validCategories.includes(categoryName)) {
    return <Navigate to="/" />;
  }

  //=========STATES=========

  //For Responsive Design
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  //Products
  const { products, filters, loading, error } = useSelector(state => state.categoryProducts);
  const productsInState = products[categoryName] || [];
  const filteredProducts = useMemo(() => filterProducts(productsInState, filters), [productsInState, filters]);

  //Clear Filter
  const [clearStates, setClearStates] = useState(false);

  //=========FUNCTIONALITY=========

  //Get All Products
  useEffect(() => {
    if (!productsInState.length) {
      dispatch(getCategoryProducts(categoryName));
    }
  }, [dispatch, categoryName, productsInState.length]);


  //Apply Filters
  const handleFilterApply = (newFilters) => {
    dispatch(setBrands(newFilters.brands));
    dispatch(setPriceRange(newFilters.priceRange));
    dispatch(setColors(newFilters.colors));
    dispatch(setRating(newFilters.rating));
    dispatch(setIsStock(newFilters.isStock));
    dispatch(setSortOption(newFilters.sortOption));
  };

  //==== Clear Filters ====
  const handleClearFilters = () => {
    dispatch(clearFilters());
    setClearStates(!clearStates);
  };

  useEffect(() => {
    handleClearFilters();
  }, [location])

  //====Filter Options, Sort and isStock====

  const handleSortChange = (event) => {
    dispatch(setSortOption(event.target.value));
  };

  const handleStockChange = () => {
    dispatch(setIsStock(!filters.isStock));
  };

  //Handler for Responsive Design
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


  const showFilterMenu = () => {
    setIsFilterVisible(true);
  };

  const hideFilterMenu = () => {
    setIsFilterVisible(false);
  };


  //============================JSX==================================

  return (
    <div className='category-products-box'>
      <div className='top-filter-options-box'>
        <div className='stock-and-sorting-box'>
          <div className='is-stock-box'>
            <RadioButton
              checked={filters.isStock}
              onChange={handleStockChange}
            />
            <span>Stoktakiler</span>
          </div>

          <select name="sorting" id="sorting" value={filters.sortOption} onChange={handleSortChange}>
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
          <CategoryFilterBar setClearStates={setClearStates} onClearFilters={clearStates} onFilterApply={handleFilterApply} closeFilterMenuFunc={hideFilterMenu} />
        </div>
        <div className='category-products-bar'>
          <CategoryProductList ClearFilters={handleClearFilters} filters={filters} products={filteredProducts} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
