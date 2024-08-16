import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteProduct, removeFavoriteProduct } from '../../../store/thunks/User/favoriteProductThunk';

import { getUserId } from '../../../store/utils/getUserId';
import { slugify } from '../../utils/slugify';
import { customErrorToast, customSuccessToast } from '../../utils/CustomToasts';
import { translateCategoryNameToEnglish, translateCategoryNameToTurkish } from '../../../constants/categories';

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import { MdShoppingCart, MdFavorite } from "react-icons/md";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import "./ProductCard.scss";

function ProductCard({ product }) {

    const userId = getUserId();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //=====================States=======================

    const { favoriteProductsRef } = useSelector(state => state.favoriteProducts);
    const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);
    const [loadingImage, setLoadingImage] = useState(true);


    //=====================Navigation=======================

    // For URL Format
    const productName = slugify(product.productName);

    const handleProduct = () => {
        navigate(`/${translateCategoryNameToTurkish(product.categoryName)}/${productName}`);
    }

    //=====================Favorites Process=======================

    //Is Favorite?
    useEffect(() => {
        const isFavorite = favoriteProductsRef
            .some(ref => ref.categoryName === translateCategoryNameToEnglish(product.categoryName) && ref.productId === product.Id);
        setIsFavoriteProduct(isFavorite);
    }, [favoriteProductsRef, product.categoryName, product.Id]);

    //Add Favorite Product
    const handleAddToFavorites = async (event) => {
        event.stopPropagation();
        if (userId) {
            customSuccessToast("Favorilere Eklendi", 1800);
            try {
                await dispatch(addFavoriteProduct({
                    userId,
                    categoryName: translateCategoryNameToEnglish(product.categoryName),
                    productId: product.Id
                }));
                setIsFavoriteProduct(true);
            } catch (error) {
                customErrorToast("Favorilere Eklenemedi");
            }
        }
        else {
            navigate('/giris-yap');
        }
    }

    //Remove Favorite Product
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

    //=========================JSX===========================
    return (
        <div onClick={handleProduct} className='product-card'>
            {isFavoriteProduct
                ?
                <button className='remove-favorite-btn' onClick={handleRemoveFromFavorites}>
                    <MdFavorite />
                </button>
                :
                <button className='add-favorite-btn' onClick={handleAddToFavorites}>
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

            <button className='basket-btn' onClick={handleProduct} >
                  <MdShoppingCart className='icon' />
            </button>
        </div>
    );
}

export default ProductCard;
