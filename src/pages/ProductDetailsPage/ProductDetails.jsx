import React from 'react'
import { useParams } from 'react-router-dom';
import Product from '../../features/ProductDetailsPageComponents/Product';
import TechnicialSpecifications from '../../features/ProductDetailsPageComponents/TechnicialSpecifications';
import ProductComments from '../../features/ProductDetailsPageComponents/ProductComments';
import AddComment from '../../features/ProductDetailsPageComponents/AddComment';
import "./ProductDetails.scss";
function ProductDetails() {

    const { categoryName, productName } = useParams();

    return (
        <>
            <Product />
            <TechnicialSpecifications />
            <ProductComments />
            <AddComment />
        </>
    )
}

export default ProductDetails