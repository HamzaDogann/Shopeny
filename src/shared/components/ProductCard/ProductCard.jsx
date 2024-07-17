import React from 'react'
import "./ProductCard.scss";

function ProductCard({product}) {
    return (
        <div className='product-card'>Product - {product}</div>
    )
}

export default ProductCard