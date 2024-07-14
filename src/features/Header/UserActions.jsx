import React from 'react'
import Badge from '@mui/material/Badge';
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineHeart } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { customSuccessToast } from '../../shared/utils/CustomToasts';
import { useNavigate } from 'react-router-dom';

function UserActions() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user)

  const navigate = useNavigate();

  const handleUserAccount = () => {
    if (user) {
      navigate('/hesabim')
    }
    else {
      navigate('/giris-yap')
    }
  }


  const handleBasketButton = () => {
    if (user) {
      navigate('/sepetim')
    }
    else {
 
      navigate('/giris-yap')
    }
  }

  return (
    <>
      <div onClick={() => handleUserAccount()} className='user-account-button'>
        <FaUserLarge className='user-icon' />
        <div className='user-actions-buttons-detail-info'>
          {user ?
            <>
              <span>Hesap</span>
               <p>{user.nameAndSurname}</p>
            </>

            :
            <>
              <span>Üye ol veya</span>
              <p>Giriş Yap</p>
            </>
          }
        </div>
      </div>

      <div className='favorite-products-button'>
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