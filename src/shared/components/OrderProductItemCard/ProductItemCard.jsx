import React from 'react'
import truncateName from '../../utils/truncateName'
import "./ProductItemCard.scss";
function ProductItemCard({ image, brand, productName, quantity, price}) {
    return (
        <div className="product-item">
            <img src={image} alt="" />
            <div className="item-info">
                <div className='item-name-and-brand-box'>
                    <span>{brand}</span>
                    <p>{truncateName(productName, 30)}</p>
                </div>
                <div className='item-quantity-box'>
                    <span className="item-quantity">{quantity}</span>
                </div>
                <div className='item-price-box'>
                    <span className="item-price">{price}₺</span>
                </div>
            </div>
        </div>
    )
}

export default ProductItemCard