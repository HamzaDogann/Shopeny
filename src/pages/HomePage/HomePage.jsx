import React, { useEffect } from 'react'
import AutoPlaySlider from '../../components/HomePageComponents/AutoPlaySlider';
import PopularProductsSlider from '../../components/HomePageComponents/PopularProductsSlider';
import SuperDealCards from '../../components/HomePageComponents/SuperDealCards';
import "./HomePage.scss";
import { useDispatch, useSelector } from 'react-redux';
import useDiscountModal from '../../shared/hooks/useDiscountModal';
import DiscountModal from '../../components/DiscountModal/DiscountModal';
import { getUserId } from '../../store/utils/getUserId';
import { fetchFavoriteProductsRef, fetchProducts } from '../../store/thunks/User/favoriteProductThunk';


function HomePage() {
  const isLoading = useSelector((state) => state.preLoader.isLoading);
  const [isModalOpen, closeModal] = useDiscountModal();

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
      {!isLoading && <DiscountModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}

export default HomePage