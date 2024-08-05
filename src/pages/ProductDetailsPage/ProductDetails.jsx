import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Product from '../../components/ProductDetailsPageComponents/Product';
import TechnicialSpecifications from '../../components/ProductDetailsPageComponents/TechnicialSpecifications';
import ProductComments from '../../components/ProductDetailsPageComponents/ProductComments';
import AddComment from '../../components/ProductDetailsPageComponents/AddComment';
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

    const BulunamayanUrun = false;

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
