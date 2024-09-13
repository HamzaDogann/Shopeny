import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { validCategories } from "../../constants/categories";
import { useDispatch, useSelector } from 'react-redux';
import { MdFilterListAlt } from "react-icons/md";


import { filterProducts } from '../../store/utils/filterProducts.js';
import { getCategoryProducts } from '../../store/thunks/Products/categoryProductsThunk';
import { setBrands, setColors, setIsFilterMode, setIsStock, setPriceRange, setRating, setSortOption } from '../../store/slices/Products/filteredCategoryProductsSlice.js';
import { clearFilters } from "../../store/slices/Products/filteredCategoryProductsSlice.js"

import CategoryFilterBar from '../../components/CategoryProductPageComponents/CategoryFilterBar';
import CategoryProductList from '../../components/CategoryProductPageComponents/CategoryProductList';
import RadioButton from '../../shared/helpers/RadioButton';
import { getCategoryBrands } from '../../store/utils/getCategoryBrands.js';
import { motion } from 'framer-motion';

import { opacityEffect } from '../../shared/animations/animations.js';
import "./CategoryProducts.scss";

function CategoryProducts() {

  //=========HOOKS=========

  const dispatch = useDispatch();
  const location = useLocation();
  const { categoryName } = useParams();


  //=========ISVALIDCATEGORY=========
  if (!validCategories.includes(categoryName)) {
    return <Navigate to="/" />;
  }

  //=========STATES=========

  //For Responsive Design
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  //Products & Filters
  const { products, loading, error } = useSelector(state => state.categoryProducts);
  const { filters, isFilterOpen } = useSelector(state => state.filteredCategoryProducts);
  const { categoryBrands } = useSelector(state => state.filteredCategoryProducts);

  const productsInState = products[categoryName] || [];
  const filteredProducts = useMemo(() => filterProducts(productsInState, filters), [productsInState, filters]);

  //Clear Filter States
  const [clearFilterStates, setClearFilterStates] = useState(false);

  //Other States
  const [isFilterButtonEnable, setIsFilterButtonEnable] = useState(false);
  

  //=========FUNCTIONALITY=========

  //====Get All Products====

  useEffect(() => {
    if (!productsInState.length) {
      dispatch(getCategoryProducts(categoryName));
    } else {
      dispatch(getCategoryBrands(categoryName));
    }
  }, [dispatch, categoryName, productsInState.length]);

  //====Apply Filters====

  const handleFilterApply = (newFilters) => {
    dispatch(setBrands(newFilters.brands));
    dispatch(setPriceRange(newFilters.priceRange));
    dispatch(setColors(newFilters.colors));
    dispatch(setRating(newFilters.rating));
    dispatch(setIsFilterMode(true));
  };

  //==== Clear Filters ====
  const handleClearFilters = () => {
    dispatch(clearFilters());
    setClearFilterStates(!clearFilterStates);
    dispatch(setIsFilterMode(false));
    setIsFilterButtonEnable(false)
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


  if (loading) {
    return <div style={{ width: "100%", height: "600px" }}></div>
  }


  //============================JSX==================================

  return (
    <motion.div {...opacityEffect(0.5)} className='category-products-box'>
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
          <CategoryFilterBar
            categoryBrands={categoryBrands}
            setClearStates={setClearFilterStates}
            onClearFilters={clearFilterStates}
            onFilterApply={handleFilterApply}
            clearFilters={handleClearFilters}
            closeFilterMenuFunc={hideFilterMenu}
            isFilterOpen={isFilterOpen}
            isFilterButtonEnable={isFilterButtonEnable}
            setIsFilterButtonEnable={setIsFilterButtonEnable}
            filters={filters}
          />
        </div>

        <div className='category-products-bar'>
          <CategoryProductList
            ClearFilters={handleClearFilters}
            filters={filters}
            products={filteredProducts}
            loading={loading} error={error}
            setIsFilterButtonEnable={setIsFilterButtonEnable} />
        </div>
      </div>
    </motion.div>
  );
}

export default React.memo(CategoryProducts);
