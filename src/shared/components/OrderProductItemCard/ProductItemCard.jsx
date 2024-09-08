import React from 'react'
import truncateName from '../../utils/truncateName'
import { formatPrice } from '../../utils/formatPrice';
import { Skeleton } from '@mui/material';
import useLazyImage from '../../hooks/useLazyImage';
import { translateCategoryNameToTurkish } from '../../../constants/categories';
import { slugify } from '../../utils/slugify';
import "./ProductItemCard.scss";
import { useNavigate } from 'react-router-dom';
function ProductItemCard({ product }) {

    const navigate = useNavigate();
    const { imageStyle, skeletonProps, onLoad } = useLazyImage({
        src: product.mainImage,
        width: 80,
        height: 80,
        borderRadius: "12px"
    });

    const handleProductLink = () => {
        navigate(`/${translateCategoryNameToTurkish(product.categoryName)}/${slugify(product.productName)}`);
    }

    return (
        <div className="product-item">
            <Skeleton {...skeletonProps} />
            <img
                onClick={handleProductLink}
                className='product-img'
                src={product.mainImage}
                alt=""
                style={imageStyle}
                onLoad={onLoad}
            />
            <div className="item-info">
                <div onClick={handleProductLink} className='name-color-brand-box'>
                    <span>{product.productBrand}</span>
                    <p>{truncateName(product.productName, 30)}</p>
                    <span className='color-box' style={{ backgroundColor: product.color }}></span>
                </div>
                <div className='item-quantity-box'>
                    <span className="item-quantity">{product.amount}</span>
                </div>
                <div className='item-price-box'>
                    <span className="item-price">{formatPrice(product.discountedPrice * product.amount)}₺</span>
                </div>
            </div>
        </div>
    )
}

export default ProductItemCard