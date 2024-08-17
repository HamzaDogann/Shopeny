import React from 'react'
import truncateName from '../../utils/truncateName'
import "./ProductItemCard.scss";
import { formatPrice } from '../../utils/formatPrice';
function ProductItemCard({ product }) {
    return (
        <div className="product-item">
            <img src={product.mainImage} alt="" />
            <div className="item-info">
                <div className='name-color-brand-box'>
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