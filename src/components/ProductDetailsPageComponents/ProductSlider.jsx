import React, { useState } from 'react';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const ProductSlider = ({ productImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.otherImages.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + productImages.otherImages.length) % productImages.otherImages.length);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="slider">
            <div className="main-image">
                <button className='previous-btn' onClick={goToPrevious}>
                    <IoIosArrowDropleftCircle />
                </button>
                {/* Main Product Image */}
                <img src={productImages.otherImages[currentIndex]} alt={`main-${currentIndex}`} />
                <button className='next-btn' onClick={goToNext}>
                    <IoIosArrowDroprightCircle />
                </button>
            </div>
            <div className="thumbnails">
                {/* Other Product Images */}
                {productImages.otherImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`thumbnail-${index}`}
                        className={currentIndex === index ? 'active' : ''}
                        onClick={() => goToImage(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductSlider;