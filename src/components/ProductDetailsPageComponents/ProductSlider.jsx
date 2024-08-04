import React, { useState } from 'react';
import ProductMain from "../../assets/images/productPhotoMain.jpg"
import ProductPhotoOther1 from "../../assets/images/ProductPhotoOther1.jpg"
import ProductPhotoOther2 from "../../assets/images/ProductPhotoOther2.jpg"
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const images = [
    ProductMain,
    ProductPhotoOther1,
    ProductPhotoOther2
];

const ProductSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
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
                <img src={images[currentIndex]} alt="main" key={currentIndex} />
                <button className='next-btn' onClick={goToNext}>
                    <IoIosArrowDroprightCircle />
                </button>
            </div>
            <div className="thumbnails">
                {/* Other Product Images */}
                {images.map((image, index) => (
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
