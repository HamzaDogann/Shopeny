import React from 'react'
import AutoPlaySlider from '../../features/HomePageComponents/AutoPlaySlider';
import PopularProductsSlider from '../../features/HomePageComponents/PopularProductsSlider';
import SuperDealCards from '../../features/HomePageComponents/SuperDealCards';
import "./HomePage.scss";

function HomePage() {
  return (
    <div className='home-page-box'>
      <AutoPlaySlider />
      <h3  className="text-center">Popüler Ürünler</h3>
      <PopularProductsSlider />
      <h3 className="text-center">Süper Fırsat</h3>
      <SuperDealCards />
    </div>
  )
}

export default HomePage