import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../../features/ProductDetailsPageComponents/Product';
import TechnicialSpecifications from '../../features/ProductDetailsPageComponents/TechnicialSpecifications';
import ProductComments from '../../features/ProductDetailsPageComponents/ProductComments';
import AddComment from '../../features/ProductDetailsPageComponents/AddComment';
import "./ProductDetails.scss";

function ProductDetails() {

    const { categoryName, productName } = useParams();

    return (
        <div className='product-details-page-box'>
            <Product />
            <TechnicialSpecifications />
            <ProductComments />
            <AddComment />
        </div>
    );
}

export default ProductDetails;
