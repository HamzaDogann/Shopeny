import React from 'react'
import AutoPlaySlider from '../../components/HomePageComponents/AutoPlaySlider';
import PopularProductsSlider from '../../components/HomePageComponents/PopularProductsSlider';
import SuperDealCards from '../../components/HomePageComponents/SuperDealCards';
import "./HomePage.scss";

function HomePage() {
  return (
    <div className='home-page-box'>
      <AutoPlaySlider />
      <h3 className="text-center">Popüler Ürünler</h3>
      <div className='title-linear-gradient-box'>
        <p></p>
      </div>
      <PopularProductsSlider />
      <h3 className="text-center">Süper Fırsat</h3>
      <div className='title-linear-gradient-box'>
        <p></p>
      </div>
      <SuperDealCards />
    </div>
  )
}

export default HomePage