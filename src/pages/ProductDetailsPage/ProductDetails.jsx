import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';

import { validCategories } from '../../constants/categories';
import { fetchProductDetailsByName } from '../../store/thunks/Products/productDetailsThunk';

import Product from '../../components/ProductDetailsPageComponents/Product';
import PreLoader from '../../components/PreLoader/PreLoader';
import TechnicialSpecifications from '../../components/ProductDetailsPageComponents/TechnicialSpecifications';
import ProductComments from '../../components/ProductDetailsPageComponents/ProductComments';
import AddComment from '../../components/ProductDetailsPageComponents/AddComment';

import "./ProductDetails.scss";

function ProductDetails() {

    const dispatch = useDispatch();
    const { categoryName, productName } = useParams();

    if (!validCategories.includes(categoryName)) {
        return <Navigate to="/" />;
    }

    //=========== Performance  Optimization ===========

    const { viewedProducts, loading } = useSelector(state => state.productDetails);
    const basketLoading = useSelector(state => state.basket.loading);

    const normalizeName = name => name.replace(/-/g, ' ').toLowerCase()
    const normalizedProductName = normalizeName(productName);

    const productId = Object.keys(viewedProducts).find(id => {
        const viewedProductName = normalizeName(viewedProducts[id]?.productName);
        return viewedProductName === normalizedProductName;
    });

    const product = viewedProducts[productId];

    //=========== Get Product Details ===========

    useEffect(() => {
        if (!product) {
            dispatch(fetchProductDetailsByName({ categoryName, productName }));
        }
    }, [dispatch, categoryName, productName, product]);


    if (loading) {
        return <div style={{ height: "400px" }}></div>;
    }

    return (
        <div className='product-details-page-box'>
            {product ? (
                <>
                    <Product product={product} />
                    <TechnicialSpecifications technicalSpecifications={product?.technicalSpecifications} />
                    <ProductComments comments={product?.productComments} />
                    <AddComment productId={productId} />
                </>
            ) : (
                <div className='no-product-box'>
                    <span>Böyle bir ürün bulunamadı.</span>
                    <Link to={"/"}>Anasayfaya Dön</Link>
                </div>
            )}
            {basketLoading && <PreLoader />}
        </div >
    );
}

export default ProductDetails;
