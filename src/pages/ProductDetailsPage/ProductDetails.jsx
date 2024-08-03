import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Product from '../../features/ProductDetailsPageComponents/Product';
import TechnicialSpecifications from '../../features/ProductDetailsPageComponents/TechnicialSpecifications';
import ProductComments from '../../features/ProductDetailsPageComponents/ProductComments';
import AddComment from '../../features/ProductDetailsPageComponents/AddComment';
import "./ProductDetails.scss";

const validCategories = [
    'bilgisayar',
    'telefon',
    'televizyon',
    'kulaklik',
    'mikrofon',
    'oyuncu-fareleri',
    'klavye',
    'kamera'
];

function ProductDetails() {

    const { categoryName } = useParams();

    if (!validCategories.includes(categoryName)) {
        return <Navigate to="/" />;
    }

    const BulunamayanUrun = true;

    return (
        <div className='product-details-page-box'>
            {BulunamayanUrun ? <div className='no-product-box'>
                <span>Böyle bir ürün bulunamadı.</span>
                <Link to={"/"}>Anasayfaya Dön</Link>

            </div> :
                <>
                    <Product />
                    <TechnicialSpecifications />
                    <ProductComments />
                    <AddComment />
                </>
            }

        </div>
    );
}

export default ProductDetails;
