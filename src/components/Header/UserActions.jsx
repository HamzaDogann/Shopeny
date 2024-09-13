import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Badge from '@mui/material/Badge';
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineHeart } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";

import truncateName from "../../shared/utils/truncateName";
import { formatPrice } from '../../shared/utils/formatPrice';

function UserActions() {

  const user = useSelector(state => state.auth.user);
  const { information } = useSelector(state => state.basket);
  const { favoriteProductsRef } = useSelector(state => state.favoriteProducts);
  const { basketProducts } = useSelector(state => state.basket);

  const [isFavorites, setIsFavorites] = useState(false);
  const [isBasketProducts, setIsBasketProduct] = useState(false);

  useEffect(() => {
    setIsFavorites(favoriteProductsRef.length > 0);
  }, [favoriteProductsRef]);

  useEffect(() => {
    setIsBasketProduct(basketProducts.length > 0);
  }, [basketProducts]);

  return (
    <>
      <NavLink
        to="/hesabim"
        className={({ isActive }) => `user-account-button ${isActive ? 'active' : ''}`}
      >
        <FaUserLarge className='user-icon' />
        <div className='user-actions-buttons-detail-info'>
          <span>{user ? user === "nologinuser" ? "Üye ol veya" : "Hesap" : "Üye ol veya"}</span>
          <p>{user ? user === "nologinuser" ? "Giriş Yap" : truncateName(user.nameAndSurname, 10) : "Giriş Yap"}</p>
        </div>
      </NavLink>

      <NavLink
        to="/favori-urunler"
        className={({ isActive }) => `favorite-products-button ${isActive ? 'active' : ''}`}
      >
        <Badge color="error" variant={isFavorites ? "dot" : ""}>
          <HiOutlineHeart className='heart-icon' />
        </Badge>
      </NavLink>

      <NavLink
        to="/sepetim"
        className={({ isActive }) => `basket-button ${isActive ? 'active' : ''}`}
      >
        <Badge color="error" variant={isBasketProducts ? "dot" : ""}>
          <TiShoppingCart className='basket-icon' />
        </Badge>
        <div className='user-actions-buttons-detail-info'>
          <span>Tutar</span>
          {information.productPrices > 0
            ? <p>{formatPrice(information.productPrices)}₺</p>
            : <p>0.00₺</p>
          }
        </div>
      </NavLink>
    </>
  );
}

export default UserActions;
