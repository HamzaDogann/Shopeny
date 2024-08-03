import React from 'react'
import Badge from '@mui/material/Badge';
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineHeart } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import truncateName from "../../shared/utils/truncateName";

function UserActions() {

  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);


  const handleUserAccount = () => {
    navigate('/hesabim');
  }

  const handleBasketButton = () => {
    navigate('/sepetim')
  }
  const handleFavoriteProductsButton = () => {
    navigate('/favori-urunler')
  }

  return (
    <>
      <div onClick={() => handleUserAccount()} className='user-account-button'>
        <FaUserLarge className='user-icon' />
        <div className='user-actions-buttons-detail-info'>
          <span>{user ? user == "nologinuser" ? "Üye ol veya" : "Hesap" : "Üye ol veya"}</span>
          <p>{user ? user == "nologinuser" ? "Giriş Yap" : truncateName(user.nameAndSurname,15) : "Giriş Yap"}</p>
        </div>
      </div>

      <div onClick={()=> handleFavoriteProductsButton()} className='favorite-products-button'>
        <Badge color="error" variant="dot">
          <HiOutlineHeart className='heart-icon' />
        </Badge>
      </div>

      <div onClick={() => handleBasketButton()} className='basket-button'>
        <Badge color="error" variant="dot">
          <TiShoppingCart className='basket-icon' />
        </Badge>
        <div className='user-actions-buttons-detail-info'>
          <span>Tutar</span>
          <p>0.00₺</p>
        </div>
      </div>
    </>
  )
}

export default UserActions