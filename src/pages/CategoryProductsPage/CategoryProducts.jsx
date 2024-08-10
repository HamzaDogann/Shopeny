import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { validCategories } from "../../constants/categories";
import { useDispatch, useSelector } from 'react-redux';
import { MdFilterListAlt } from "react-icons/md";
import { filterProducts } from '../../store/utils/filterUtils';
import CategoryFilterBar from '../../components/CategoryProductPageComponents/CategoryFilterBar';
import CategoryProductList from '../../components/CategoryProductPageComponents/CategoryProductList';
import { getCategoryProducts } from '../../store/thunks/Products/categoryProductsThunk';
import "./CategoryProducts.scss";
import { setBrands, setColors, setIsStock, setPriceRange, setRating, setSortOption } from '../../store/slices/Products/categoryProductsSlice';
import RadioButton from '../../shared/helpers/RadioButton';

function CategoryProducts() {
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const { products, filters, loading, error } = useSelector(state => state.categoryProducts);
  const productsInState = products[categoryName] || [];

  // Filtrelenmiş ürünleri useMemo ile elde et
  const filteredProducts = useMemo(() => filterProducts(productsInState, filters), [productsInState, filters]);

  console.log('Ürünler:', productsInState);
  console.log('Filtreler:', filters);
  console.log('Filtrelenmiş Ürünler:', filteredProducts);

  // Sayfa yüklendiğinde ürünleri al
  useEffect(() => {
    if (!productsInState.length) {
      dispatch(getCategoryProducts(categoryName));
    }
  }, [dispatch, categoryName, productsInState.length]);

  // Filtre seçeneklerini güncelle
  const handleFilterApply = (newFilters) => {
    dispatch(setBrands(newFilters.brands));
    dispatch(setPriceRange(newFilters.priceRange));
    dispatch(setColors(newFilters.colors));
    dispatch(setRating(newFilters.rating));
    dispatch(setIsStock(newFilters.isStock));
    dispatch(setSortOption(newFilters.sortOption));
  };

  // Filtre seçeneklerini güncelle
  const handleSortChange = (event) => {
    dispatch(setSortOption(event.target.value));
  };

  const handleStockChange = () => {
    dispatch(setIsStock(!filters.isStock));
  };

  // Responsive tasarım için state
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  // Responsive değişiklikleri yönet
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

  // Filtre menüsünü göster/gizle
  const showFilterMenu = () => {
    setIsFilterVisible(true);
  };

  const hideFilterMenu = () => {
    setIsFilterVisible(false);
  };

  // Geçerli kategori geçerli değilse anasayfaya yönlendir
  if (!validCategories.includes(categoryName)) {
    return <Navigate to="/" />;
  }

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
          <CategoryFilterBar onFilterApply={handleFilterApply} closeFilterMenuFunc={hideFilterMenu} />
        </div>
        <div className='category-products-bar'>
          <CategoryProductList  filters={filters} products={filteredProducts} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
