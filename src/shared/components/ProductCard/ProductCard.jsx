import React from 'react'
import "./ProductCard.scss";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { MdShoppingCart } from "react-icons/md";
import ProductImage from "../../../assets/images/MacbookPro.png"
import { MdFavorite } from "react-icons/md";

function ProductCard() {
    return (
        <div className='product-card'>

            <button className='add-favorite-btn' >
                <MdFavorite />
            </button>

            <button className='remove-favorite-btn' >
                <MdFavorite />
            </button>
            
            <div className='image-box'>
                <img src={ProductImage} />
            </div>
            <div className='product-name-box'>
                <p>Macbook Pro M4 16 Inc</p>
                <span>Apple</span>
            </div>
            <div className='rating-box'>
                <Stack spacing={1}>
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} size="small" readOnly />
                </Stack>
                <p>4.5</p>
            </div>
            <div className='original-price-box'>
                <strike>350$</strike>
                <span>%50</span>
            </div>
            <p className='discount-price'>
                175₺
            </p>

            <button className='basket-btn' >
                <MdShoppingCart />
            </button>
        </div>
    )
}

export default ProductCard