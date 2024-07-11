import React from 'react'
import Badge from '@mui/material/Badge';
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineHeart } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";


function UserActions() {
  return (
    <>
      <div className='user-account-button'>
        <FaUserLarge className='user-icon' />
        <div className='user-actions-buttons-detail-info'>
          <span>Hesap</span>
          <p>Hamza Doğan</p>
        </div>
      </div>

      <div className='favorite-products-button'>
        <Badge color="error" variant="dot">
          <HiOutlineHeart className='heart-icon' />
        </Badge>
      </div>
      
      <div className='basket-button'>
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