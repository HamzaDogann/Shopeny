import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import { MdShoppingCart, MdFavorite } from "react-icons/md";
import { TbShoppingCartCopy } from "react-icons/tb";


import { slugify } from '../../utils/slugify';
import { customErrorToast, customSuccessToast } from '../../utils/CustomToasts';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { addFavoriteProduct, removeFavoriteProduct } from '../../../store/thunks/User/favoriteProductThunk';
import { getUserId } from '../../../store/utils/getUserId';

import "./ProductCard.scss";
import { translateCategoryNameToEnglish, translateCategoryNameToTurkish } from '../../../constants/categories';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = getUserId();

    const { favoriteProductsRef } = useSelector(state => state.favoriteProducts)

    const [isBasketProduct, setIsBasketProduct] = useState(false);
    const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);
    const [loadingImage, setLoadingImage] = useState(true);

    // For URL Format
    const productName = slugify(product.productName);


    useEffect(() => {
        const isFavorite = favoriteProductsRef.some(ref =>
            ref.categoryName === translateCategoryNameToEnglish(product.categoryName) &&
            ref.productId === product.Id
        );
        setIsFavoriteProduct(isFavorite);
    }, [favoriteProductsRef, product.categoryName, product.Id]);

    const handleProduct = () => {
        navigate(`/${translateCategoryNameToTurkish(product.categoryName)}/${productName}`);
    }

    const handleAddToFavorites = async (event) => {
        event.stopPropagation();
        setIsFavoriteProduct(true);
        customSuccessToast("Favorilere Eklendi", 1800);
        try {
            await dispatch(addFavoriteProduct({
                userId,
                categoryName: translateCategoryNameToEnglish(product.categoryName),
                productId: product.Id
            }));

        } catch (error) {
            customErrorToast("Favorilere Eklenemedi");
        }
    }

    const handleRemoveFromFavorites = async (event) => {
        event.stopPropagation();
        setIsFavoriteProduct(false);
        customSuccessToast("Favorilerden Çıkarıldı", 1800);
        try {
            const favoriteProduct = favoriteProductsRef.find(
                ref => ref.categoryName === translateCategoryNameToEnglish(product.categoryName) && ref.productId === product.Id
            );

            if (favoriteProduct) {
                await dispatch(removeFavoriteProduct({
                    userId,
                    categoryName: favoriteProduct.categoryName,
                    productId: favoriteProduct.productId
                }));

            } else {
                customErrorToast("Favori ürün bulunamadı");
            }
        } catch (error) {
            customErrorToast("Favorilerden çıkarılamadı");
        }
    };

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
