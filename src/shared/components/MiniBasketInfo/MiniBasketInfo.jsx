import React from 'react';
import "../BasketInfo/BasketInformations.scss";

function BasketInformations() {

    return (
        <div className="basket-information-box">
            <h2>Siparişin Özeti</h2>
            <p className="dividing-line"></p>
            <div  style={{marginBottom:"10px"}} className="product-amount-and-price-box">
                <p>8 Ürün</p>
                <p>350.000₺</p>
            </div>
            <div className="total-promotion-and-cargo-prices-box">
                <div className="price-box">
                    <p>Promosyon İndirimi</p>
                    <span className="promotion-discount">20%</span>
                </div>
                <div className="price-box">
                    <p>Kargo Ücreti</p>
                    <span className="cargo-price">+70₺</span>
                </div>
            </div>
            <p className="dividing-line"></p>

            <div className="basket-total-price-box">
                <p>Toplam Tutar</p>
                <p className="total-price">450.000₺</p>
            </div>
            <div className="checkout-button-box">
                <button className="checkout-btn">Onayla</button>
            </div>
        </div>
    );
}

export default BasketInformations;
