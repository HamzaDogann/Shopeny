import React, { useState } from 'react';
import Checkbox from '../../shared/helpers/Checkbox';
import { Slider, Box, Rating } from '@mui/material';
import { MdClose } from "react-icons/md";

function CategoryFilterBar({closeFilterMenuFunc}) {

  //Filter Options
  const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Huawei', 'Xiaomi', 'Oppo'];
  const colors = [
    { name: 'Siyah', code: '#1a1a1a' },
    { name: 'Beyaz', code: '#ffffff' },
    { name: 'Gri', code: '#60676b' },
    { name: 'Kırmızı', code: '#d93f3f' },
    { name: 'Yeşil', code: '#19d47a' },
    { name: 'Mavi', code: '#3c6ade' },
    { name: 'Turuncu', code: '#f27d59' }
  ];

  //Filter States
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([20, 180]);
  const [checkedColors, setCheckedColors] = useState([]);
  const [rating, setRating] = useState(0);
  //! ======= HANDLE FILTER METHODS =======

  // Handle Brands
  const handleCheckboxChange = (brand) => {
    setCheckedBrands(prevState =>
      prevState.includes(brand)
        ? prevState.filter(item => item !== brand)
        : [...prevState, brand]
    );
  };

  //Handle Price
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prevPriceRange) => {
      return name === 'min'
        ? [Math.min(value, prevPriceRange[1]), prevPriceRange[1]]
        : [prevPriceRange[0], Math.max(value, prevPriceRange[0])];
    });
  };

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  //Handle Color
  const handleColorCheckboxChange = (color) => {
    setCheckedColors(prevState =>
      prevState.includes(color)
        ? prevState.filter(item => item !== color)
        : [...prevState, color]
    );
  };


  //Handle Rating
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  return (
    <div className="filter-box">
      <div className="filter-options-box">
        {/* Brands */}
        <p className='brands-title'>Markalar</p>
        <ul>
          {brands.map((brand, index) => (
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
                max={1000}
              />
              <p>₺</p>
            </div>
          </Box>
          <Slider
            value={priceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
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
                checked={checkedColors.includes(color.name)}
                onChange={() => handleColorCheckboxChange(color.name)}
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
        <button className='filter-btn'>Filtreyi Uygula</button>
        <button onClick={closeFilterMenuFunc} className='close-filter-menu-btn'><MdClose /></button>
      </div>
    </div>
  );
}

export default CategoryFilterBar;