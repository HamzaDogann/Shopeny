import React, { useState } from 'react';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from '@mui/material/Skeleton';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductSlider = ({ productImages }) => {

    //==============States==============

    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [thumbnailsLoaded, setThumbnailsLoaded] = useState(false);

    //=============Functions==============

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.otherImages.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + productImages.otherImages.length) % productImages.otherImages.length);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    const handleImageLoad = () => {
        setImagesLoaded(true);
    };

    const handleThumbnailLoad = () => {
        setThumbnailsLoaded(true);
    };

    return (
        <div className="slider">
            <div className="main-image">
                {imagesLoaded && (
                    <>
                        <button className="previous-btn" onClick={goToPrevious}>
                            <IoIosArrowDropleftCircle />
                        </button>
                    </>
                )}
                {/* Show Skeleton while images are loading */}
                {!imagesLoaded && (
                    <Skeleton variant="rectangular" sx={{ borderRadius: "20px", bgcolor: 'grey.200' }} width="100%" height="100%" />
                )}
                {/* Main Product Image */}
                <LazyLoadImage
                    src={productImages.otherImages[currentIndex]}
                    alt={`main-${currentIndex}`}
                    effect="blur" // or "opacity", "black-and-white", etc.
                    className={`lazy-main-image ${imagesLoaded ? 'visible' : 'hidden'}`}
                    onLoad={handleImageLoad}
                />

                {imagesLoaded && (
                    <>
                        <button className="next-btn" onClick={goToNext}>
                            <IoIosArrowDroprightCircle />
                        </button>
                    </>
                )}
            </div>
            <div className="thumbnails">
                {/* Other Product Images */}
                {productImages.otherImages.map((image, index) => (
                    <div key={index} className="thumbnail-wrapper">
                        {!thumbnailsLoaded && (
                            <Skeleton variant="rectangular" sx={{ borderRadius: "8px", bgcolor: 'grey.200' }} width={80} height={80} />
                        )}
                        <LazyLoadImage
                            src={image}
                            alt={`thumbnail-${index}`}
                            className={currentIndex === index ? 'lazy-thumbnails-images active' : 'lazy-thumbnails-images'}
                            onClick={() => goToImage(index)}
                            effect="blur"
                            onLoad={handleThumbnailLoad}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSlider;
