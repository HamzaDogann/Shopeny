import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { validCategories } from "../../constants/categories"

import RadioButton from "../../shared/helpers/RadioButton"
import "./CategoryProducts.scss"
import CategoryFilterBar from '../../features/CategoryProductPageComponents/CategoryFilterBar';
import CategoryProductList from '../../features/CategoryProductPageComponents/CategoryProductList';
function CategoryProducts() {

  const { categoryName } = useParams();

  const [sortOption, setSortOption] = useState('priceAsc');

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  if (!validCategories.includes(categoryName)) {
    return <Navigate to="/" />;
  }

  return (
    <div className='category-products-box'>

      <div className='top-filter-options-box'>
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

      <div className='category-products'>
        <div className='category-filter-bar'>
          {/* Bazı propslar alıcaklar */}
          <CategoryFilterBar />
        </div>
        <div className='category-products-bar'>
          {/* Bazı propslar alıcaklar */}
          <CategoryProductList />
        </div>
      </div>

    </div>
  )
}

export default CategoryProducts