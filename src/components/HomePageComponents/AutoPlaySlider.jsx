import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

//Desktop Images
import Banner1Desktop from "../../assets/images/SliderBanners/Banner1.webp";
import Banner2Desktop from "../../assets/images/SliderBanners/Banner2.webp";
import Banner3Desktop from "../../assets/images/SliderBanners/Banner3.webp";
import Banner4Desktop from "../../assets/images/SliderBanners/Banner4.webp";
import Banner5Desktop from "../../assets/images/SliderBanners/Banner5.webp";

//Mobile Images
import Banner1Mobile from "../../assets/images/SliderBanners/MobileBanner1.webp";
import Banner2Mobile from "../../assets/images/SliderBanners/MobileBanner2.webp";
import Banner3Mobile from "../../assets/images/SliderBanners/MobileBanner3.webp";
import Banner4Mobile from "../../assets/images/SliderBanners/MobileBanner4.webp";
import Banner5Mobile from "../../assets/images/SliderBanners/MobileBanner5.webp";

//Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

export default function AutoPlaySlider() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const Banner1 = isMobile ? Banner1Mobile : Banner1Desktop;
    const Banner2 = isMobile ? Banner2Mobile : Banner2Desktop;
    const Banner3 = isMobile ? Banner3Mobile : Banner3Desktop;
    const Banner4 = isMobile ? Banner4Mobile : Banner4Desktop;
    const Banner5 = isMobile ? Banner5Mobile : Banner5Desktop;

    return (
        <div className='auto-play-slider-box'>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 6500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination]}
                className="myAutoPlaySlider"
            >
                <SwiperSlide>
                    <img
                        src={Banner1}
                        alt="Banner 1"
                        onClick={() => handleClick('/telefon/iphone-16')}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={Banner2}
                        alt="Banner 2"
                        onClick={() => handleClick('/bilgisayar/macbook-air')}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={Banner3}
                        alt="Banner 3"
                        onClick={() => handleClick('/kulaklik/steelseries-oyuncu-kulaklik')}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={Banner4}
                        alt="Banner 4"
                        onClick={() => handleClick('/telefon/redmi-note-12-pro-5g')}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={Banner5}
                        alt="Banner 5"
                        onClick={() => handleClick('/televizyon/toshiba-uhd-tv')}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
