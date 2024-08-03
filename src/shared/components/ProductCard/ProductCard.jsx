
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { MdShoppingCart, MdFavorite } from "react-icons/md";
import { TbShoppingCartCopy } from "react-icons/tb";

import ProductImage from "../../../assets/images/MacbookPro.png";
import { useNavigate } from 'react-router-dom';
import "./ProductCard.scss";
import { useState } from 'react';
import { customSuccessToast } from '../../utils/CustomToasts';

function ProductCard() {

    const navigate = useNavigate();
    const [isBasketProduct, setIsBasketProduct] = useState(false);
    const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);

    const handleProduct = () => {
        navigate('/bilgisayar/macbook');
    }

    const handleAddToFavorites = (event) => {
        event.stopPropagation();
        setIsFavoriteProduct(true)
        customSuccessToast("Favorilere Eklendi", 1800)
        // Favori ekleme işlemleri burada yapılacak
    }

    const handleRemoveFromFavorites = (event) => {
        event.stopPropagation();
        setIsFavoriteProduct(false);
        customSuccessToast("Favorilerden Çıkarıldı", 1800)
        // Favori çıkarma işlemleri burada yapılacak
    }

    const handleAddToCart = (event) => {
        event.stopPropagation();
        setIsBasketProduct(!isBasketProduct);
        customSuccessToast("Sepete Eklendi", 1500)
        // Sepete ekleme işlemleri burada yapılacak
    }

    return (
        <div onClick={handleProduct} className='product-card'>
            {
                isFavoriteProduct
                    ?
                    <button className='remove-favorite-btn' onClick={handleRemoveFromFavorites}>
                        <MdFavorite />
                    </button>
                    : <button className='add-favorite-btn' onClick={handleAddToFavorites}>
                        <MdFavorite />
                    </button>
            }

            <div className='image-box'>
                <img src={ProductImage} alt="Product" />
            </div>
            <div className='product-name-box'>
                <p>Ultra pro Iphone telefonlar</p>
                <span>Apple</span>
            </div>
            <div className='rating-box'>
                <Stack spacing={1}>
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} size="small" readOnly />
                </Stack>
                <p>4.5</p>
            </div>
            <div className='original-price-box'>
                <strike>350₺</strike>
                <span>%50</span>
            </div>
            <p className='discount-price'>
                202.175₺
            </p>

            <button className='basket-btn' onClick={handleAddToCart} style={{ backgroundColor: isBasketProduct ? '#f27d59' : '' }}>
                {isBasketProduct
                    ? <TbShoppingCartCopy className='icon' />
                    : <MdShoppingCart className='icon' />
                }
            </button>
        </div>
    )
}

export default ProductCard;
