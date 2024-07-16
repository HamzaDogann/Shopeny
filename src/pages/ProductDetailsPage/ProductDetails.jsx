import React from 'react'
import "./ProductDetails.scss";
import { useParams } from 'react-router-dom';

function ProductDetails() {

    const { categoryName, productName } = useParams();

    return (
        <div>
            <h2>Ürün Resimleri</h2>
            <h4>Ürün Marka ve Adı</h4>
            <h4>Fiyat, Sepete ekle bilgileri</h4>
            <hr />
            <h1>Teknik Özellikler</h1>
            <hr />
            <h1>Yorumlar </h1>
        </div>
    )
}

export default ProductDetails