import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
// import required modules
import { FreeMode, Navigation } from 'swiper/modules';
import ProductCard from '../../shared/components/ProductCard/ProductCard';

import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

export default function PopularProductsSlider() {
    const swiperRef = useRef(null);

    return (
        <>
            <div className="popular-products-box">
                <button
                    className="prev-button"
                    onClick={() => swiperRef.current.swiper.slidePrev()}
                >
                    <IoIosArrowDropleftCircle />
                </button>

                <Swiper
                    ref={swiperRef}
                    slidesPerView={30}
                    spaceBetween={0}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.next-button',
                        prevEl: '.prev-button',
                    }}
                    modules={[FreeMode, Navigation]}
                    className="popular-product-swiper"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        900: {
                            slidesPerView: 2,
                        },

                        1177: {
                            slidesPerView: 3,
                        },
                        1450: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {Array.from({ length: 8 }, (_, i) => (
                        <SwiperSlide key={i}>
                            <ProductCard product={i + 1} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    className="next-button"
                    onClick={() => swiperRef.current.swiper.slideNext()}
                >
                    <IoIosArrowDroprightCircle />
                </button>
            </div>
        </>

    );
}