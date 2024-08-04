import React from 'react';
import Slider from 'react-infinite-logo-slider';

import Canon from "../../assets/images/Footer/Brands/Canon.png";
import Apple from "../../assets/images/Footer/Brands/Apple.png";
import Dell from "../../assets/images/Footer/Brands/Dell.png";
import Sony from "../../assets/images/Footer/Brands/Sony.png";
import HP from "../../assets/images/Footer/Brands/HP.png";
import Logitech from "../../assets/images/Footer/Brands/Logitech.png";
import Samsung from "../../assets/images/Footer/Brands/Samsung.png";
import Microsoft from "../../assets/images/Footer/Brands/Microsoft.png";

const brands = [
    { name: 'Apple', img: Apple },
    { name: 'Samsung', img: Samsung },
    { name: 'Sony', img: Sony },
    { name: 'Dell', img: Dell },
    { name: 'HP', img: HP },
    { name: 'Microsoft', img: Microsoft },
    { name: 'Logitech', img: Logitech },
    { name: 'Canon', img: Canon }
];

function InfiniteBrands() {
    return (
        <div className='infinite-brands-box'>
            <Slider
                width="250px"
                duration={30}
                pauseOnHover={true}
                blurBorders={true}
                blurBoderColor={'#fff'}
            >
                {brands.map((brand, index) => (
                    <Slider.Slide key={index}>
                        <div className='brand-item'>
                            <img src={brand.img} alt={brand.name} style={{ width: "100px" }} />
                        </div>
                    </Slider.Slide>
                ))}
            </Slider>
        </div>
    );
}

export default InfiniteBrands;