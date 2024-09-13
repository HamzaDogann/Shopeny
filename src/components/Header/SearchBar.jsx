import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CgSearch } from "react-icons/cg";

import { slugify } from "../../shared/utils/slugify";
import truncateName from '../../shared/utils/truncateName';
import useDebounce from '../../shared/hooks/useDebounce';

import { searchProductsThunk } from '../../store/thunks/searchProductsThunk';
import { clearSearchResults } from '../../store/slices/searchProductsSlice';

function SearchBar() {

  //=========STATES=======

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchBarRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [focusState, setFocusState] = useState(false);

  //====SEARCH BAR STATES/ACTIONS=====

  const { resultProducts, loading } = useSelector((state) => state.searchProducts);
  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedInputValue) {
      dispatch(searchProductsThunk(debouncedInputValue));
      setIsVisible(true);
    } else {
      dispatch(clearSearchResults());
      setIsVisible(false);
    }
  }, [debouncedInputValue, dispatch]);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    setFocusState(true);
  };

  const handleBlur = () => {
    setFocusState(false);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsVisible(false);

    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.trim()) {
        dispatch(searchProductsThunk(inputValue.trim()));
        setIsVisible(true);
      }
    }
  };

  const handleLinkClick = (e, categoryName, productName) => {
    e.preventDefault();
    const slug = slugify(productName);
    setInputValue("");
    navigate(`/${categoryName}/${slug}`);
    setIsVisible(false);
  };

  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={`search-bar ${isVisible ? 'search-active' : ''}`} ref={searchBarRef}>
      <div className='search-box'>
        <input
          className='header-search-bar'
          placeholder={focusState ? "" : "Bir ürün arayın..."}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />
        <CgSearch className={`icon ${focusState ? 'hidden' : ''}`} />
      </div>

      <div className={`search-results ${isVisible ? 'visible' : ''} ${loading ? 'spinner-active' : ''}`}>
        {loading ? (
          <div className="spinner"></div>
        ) :
          resultProducts.length > 0 ?
            resultProducts.map(product => (
              <div
                key={product.productName}
                onClick={(e) => handleLinkClick(e, product.categoryName, product.productName)}
                className="search-result-item"
                style={{ cursor: 'pointer' }}
              >
                {truncateName(product.productName, 40)}
              </div>
            ))
            : <div className='no-results-box'>Böyle bir ürün bulunamadı</div>
        }
      </div>
    </div>
  );
}

export default SearchBar;
