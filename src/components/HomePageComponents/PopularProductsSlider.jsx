import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Navigation } from 'swiper/modules';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { fetchPopularProducts } from '../../store/thunks/Products/popularProductThunk'; 
import { categoryTranslation } from '../../constants/categories';

export default function PopularProductsSlider() {
    const swiperRef = useRef(null);
    const dispatch = useDispatch();

    const { popularProducts } = useSelector(state => state.popularProducts);

    useEffect(() => {
        // Eğer popularProducts dizisi boşsa veri çek
        if (popularProducts.length === 0) {
            dispatch(fetchPopularProducts());
        }
    }, [dispatch, popularProducts.length]);

    const translatedProducts = popularProducts.map(product => ({
        ...product,
        categoryName: Object.keys(categoryTranslation).find(key => categoryTranslation[key] === product.categoryName) || product.categoryName
    }));

    return (
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
                    600: {
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
                {translatedProducts.map((product, i) => (
                    <SwiperSlide key={i}>
                        <ProductCard product={product} />
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
    );
}
