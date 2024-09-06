import React, { useEffect, useState } from 'react';
import Checkbox from '../../shared/helpers/Checkbox';
import { Slider, Box, Rating } from '@mui/material';
import { MdClose } from "react-icons/md";
import { colors } from "../../constants/FilterColors";
import { opacityAndTransformEffect } from '../../shared/animations/animations';
import { motion } from "framer-motion";
function CategoryFilterBar({ isFilterOpen, categoryBrands, onFilterApply, onClearFilters, closeFilterMenuFunc, clearFilters, isFilterButtonEnable, setIsFilterButtonEnable }) {

  //Filter States
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [checkedColors, setCheckedColors] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setCheckedBrands([])
    setPriceRange([0, 200000])
    setCheckedColors([])
    setRating(0)
  }, [onClearFilters])

  //! ======= Handle Filter Methods =======

  // Handle Brands
  const handleCheckboxChange = (brand) => {
    setCheckedBrands(prevState =>
      prevState.includes(brand)
        ? prevState.filter(item => item !== brand)
        : [...prevState, brand]
    );
    setIsFilterButtonEnable(true);
  };

  //Handle Price
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prevPriceRange) => {
      return name === 'min'
        ? [Math.min(value, prevPriceRange[1]), prevPriceRange[1]]
        : [prevPriceRange[0], Math.max(value, prevPriceRange[0])];
    });
    setIsFilterButtonEnable(true);
  };

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
    setIsFilterButtonEnable(true);
  };

  //Handle Colors
  const handleColorCheckboxChange = (color) => {
    setCheckedColors(prevState =>
      prevState.includes(color)
        ? prevState.filter(item => item !== color)
        : [...prevState, color]
    );
    setIsFilterButtonEnable(true);
  };

  //Handle Rating
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    setIsFilterButtonEnable(true);
  };

  //! ======= Apply Filters ======= 

  const applyFilters = () => {
    onFilterApply({
      brands: checkedBrands,
      priceRange,
      colors: checkedColors,
      rating
    });
    closeFilterMenuFunc();
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    clearFilters();
    closeFilterMenuFunc(false);
    setIsFilterButtonEnable(false);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };


  return (
    <div className="filter-box">
      <div className="filter-options-box">
        {/* Brands */}
        <p className='brands-title'>Markalar</p>
        <ul>
          {categoryBrands.map((brand, index) => (
            <li key={index}>
              <Checkbox
                id={`brand-${index}`}
                label={brand}
                checked={checkedBrands.includes(brand)}
                onChange={() => handleCheckboxChange(brand)}
              />
              <label htmlFor={`brand-${index}`}>{brand}</label>
            </li>
          ))}
        </ul>

        {/* Prices */}
        <p className='price-title'>Fiyat Aralığı</p>
        <Box className="price-range-slider" sx={{ width: 300, padding: 3 }}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <div className='custom-input-box'>
              <input
                className='custom-input'
                type="number"
                name="min"
                value={priceRange[0]}
                onChange={handleInputChange}
                min={0}
                max={priceRange[1]}
              />
              <p>₺</p>
            </div>

            <span className='price-dividing-line' >-</span>

            <div className='custom-input-box'>
              <input
                className='custom-input'
                type="number"
                name="max"
                value={priceRange[1]}
                onChange={handleInputChange}
                min={priceRange[0]}
                max={200000}
              />
              <p>₺</p>
            </div>
          </Box>
          <Slider
            value={priceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={200000}
            step={10}
          />
        </Box>

        {/* Colors */}
        <p style={{ marginTop: "5px" }} className='colors-title'>Renkler</p>
        <ul>
          {colors.map((color, index) => (
            <li key={index}>
              <Checkbox
                id={`color-${index}`}
                label={color.name}
                checked={checkedColors.includes(color.code)}
                onChange={() => handleColorCheckboxChange(color.code)}
              />
              <label className='color-box' htmlFor={`color-${index}`}>
                <span
                  className="color-circle"
                  style={{ backgroundColor: color.code }}
                />
                <span>{color.name}</span>
              </label>
            </li>
          ))}
        </ul>

        {/* Customer Rating */}
        <p className='rating-title'>Müşteri Puanı</p>
        <div>
          <Rating
            name="half-rating"
            value={rating}
            precision={0.5}
            onChange={handleRatingChange}
          />
        </div>

        {/* Filter Button */}
        <div className='filter-buttons'>
          {isFilterButtonEnable && <button className='filter-btn' onClick={applyFilters}>Filtreyi Uygula</button>}
          {isFilterOpen && <button className='remove-filter-btn' onClick={handleClearFilters}>Filtreyi Temizle</button>}
        </div>
        <button onClick={closeFilterMenuFunc} className='close-filter-menu-btn'><MdClose /></button>
      </div>
    </div>
  );
}

export default CategoryFilterBar;