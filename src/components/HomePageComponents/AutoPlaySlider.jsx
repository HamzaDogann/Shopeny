import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderBanner1 from "../../assets/images/SliderBanners/SliderBanner1.jpg";
import SliderBanner2 from "../../assets/images/SliderBanners/SliderBanner2.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination} from 'swiper/modules';

export default function AutoPlaySlider() {
    return (
        <>
            <div className='auto-play-slider-box'>
                <Swiper
                    spaceBetween={0}
                    centeredSlides={true}
                    autoplay={{
                        delay: 4500,
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
                        <img style={{ width: "100%" }} src={SliderBanner1} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img style={{ width: "100%" }} src={SliderBanner2} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img style={{ width: "100%" }} src={SliderBanner1} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img style={{ width: "100%" }} src={SliderBanner2} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img style={{ width: "100%" }} src={SliderBanner1} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img style={{ width: "100%" }} src={SliderBanner2} alt="" />
                    </SwiperSlide>

                </Swiper>
            </div>

        </>
    );
}
