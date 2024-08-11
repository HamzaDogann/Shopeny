import React, { useEffect } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import Product from '../../components/ProductDetailsPageComponents/Product';
import TechnicialSpecifications from '../../components/ProductDetailsPageComponents/TechnicialSpecifications';
import ProductComments from '../../components/ProductDetailsPageComponents/ProductComments';
import AddComment from '../../components/ProductDetailsPageComponents/AddComment';
import { validCategories } from '../../constants/categories';
import { useDispatch, useSelector } from 'react-redux';
import "./ProductDetails.scss";
import { fetchProductDetailsByName } from '../../store/thunks/Products/productDetailsThunk';

function ProductDetails() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { categoryName, productName } = useParams();

    if (!validCategories.includes(categoryName)) {
        return <Navigate to="/" />;
    }

    const { viewedProducts, loading, error } = useSelector(state => state.productDetails);

    const normalizeName = name => name.replace(/-/g, ' ').toLowerCase()
    const normalizedProductName = normalizeName(productName);

    const productId = Object.keys(viewedProducts).find(id => {
        const viewedProductName = normalizeName(viewedProducts[id]?.productName);
        return viewedProductName === normalizedProductName;
    });

    const product = viewedProducts[productId];

    useEffect(() => {
        if (!product) {
            dispatch(fetchProductDetailsByName({ categoryName, productName }));
        }
    }, [dispatch, categoryName, productName, product]);

    if (loading) {
        return <div style={{ height: "400px" }}>Yükleniyor...</div>;
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
        </div>
    );
}

export default ProductDetails;
