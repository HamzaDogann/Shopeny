import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgSearch } from "react-icons/cg";
import { slugify } from "../../shared/utils/slugify";
import truncateName from '../../shared/utils/truncateName';

function SearchBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [searching, setSearching] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [focusState, setFocusState] = useState(false);
  const [products, setProducts] = useState([
    { categoryName: 'bilgisayar', productName: 'Macbook Pro 2 Ultra Vip' },
    { categoryName: 'telefon', productName: 'iPhone 12 Ultra Premium Siyah Siyah Siyah SiyahSiyah' },
    { categoryName: 'kulaklik', productName: 'Lenovo Oyuncu Kulaklık Lenovo Oyuncu Kulaklık Oyuncu ' },
    { categoryName: 'kamera', productName: 'Sony Ultra Çözünürlük Kamera' },
    { categoryName: 'telefon', productName: 'Redmi Note 9 Pro Yeşil' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsVisible(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setSearching(true);

    setTimeoutId(
      setTimeout(() => {
        if (value.length > 0) {
          setTimeout(() => {
            setSearching(false);
          }, 500);
        } else {
          setIsVisible(false);
          setSearching(false);
        }
      }, 500)
    );
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
      setSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsVisible(true);
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
  }, []);

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

      <div className={`search-results ${isVisible ? 'visible' : ''} ${searching ? 'spinner-active' : ''}`}>
        {searching ? (
          <div className="spinner"></div>
        ) :
          products.length > 0 ?
            products.map(product => (
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
