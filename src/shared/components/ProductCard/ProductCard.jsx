import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { MdShoppingCart, MdFavorite } from "react-icons/md";
import { TbShoppingCartCopy } from "react-icons/tb";

import { slugify } from '../../utils/slugify';
import { customSuccessToast } from '../../utils/CustomToasts';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import "./ProductCard.scss";
function ProductCard({ product }) {

    const navigate = useNavigate();

    const [isBasketProduct, setIsBasketProduct] = useState(false);
    const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);
    const [loadingImage, setLoadingImage] = useState(true);

    //For URL Format
    const productName = slugify(product.productName);

    const handleProduct = () => {
        navigate(`/${product.categoryName}/${productName}`);
    }

    const handleAddToFavorites = (event) => {
        event.stopPropagation();
        setIsFavoriteProduct(true);
        customSuccessToast("Favorilere Eklendi", 1800);
        // Favori ekleme işlemleri burada yapılacak
    }

    const handleRemoveFromFavorites = (event) => {
        event.stopPropagation();
        setIsFavoriteProduct(false);
        customSuccessToast("Favorilerden Çıkarıldı", 1800);
        // Favori çıkarma işlemleri burada yapılacak
    }

    const handleAddToCart = (event) => {
        event.stopPropagation();
        setIsBasketProduct(!isBasketProduct);
        customSuccessToast("Sepete Eklendi", 1500);
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
                {loadingImage && (
                    <div className='spinner-overlay'>
                        <CircularProgress style={{ color: '#496aee' }} />
                    </div>
                )}
                <LazyLoadImage
                    alt={product.productName}
                    effect="blur"
                    src={product.productImages.mainImage}
                    afterLoad={() => setLoadingImage(false)}
                    onError={() => setLoadingImage(false)}
                    className='product-image'
                />
            </div>

            <div className='product-name-box'>
                <p>{product.productName}</p>
                <span>{product.productBrand}</span>
            </div>
            <div className='rating-box'>
                <Stack spacing={1}>
                    <Rating
                        name="half-rating-read"
                        defaultValue={product.productStar}
                        precision={0.5}
                        size="small"
                        readOnly
                    />
                </Stack>
                <p>{product.productStar}</p>
            </div>
            <div className='original-price-box'>
                <strike>{product.productNormalPrice}₺</strike>
                <span>%{product.discountRate}</span>
            </div>
            <p className='discount-price'>
                {product.discountedPrice}₺
            </p>

            <button className='basket-btn' onClick={handleAddToCart} style={{ backgroundColor: isBasketProduct ? '#f27d59' : '' }}>
                {isBasketProduct
                    ? <TbShoppingCartCopy className='icon' />
                    : <MdShoppingCart className='icon' />
                }
            </button>
        </div>
    );
}

export default ProductCard;
