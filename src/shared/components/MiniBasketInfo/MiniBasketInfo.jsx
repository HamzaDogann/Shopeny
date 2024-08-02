import React, { useEffect, useState } from 'react';
import "../BasketInfo/BasketInformations.scss";

function MiniBasketInfo({ onGoVerification }) {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 200) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }

            if (scrollPosition > 1400) {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='mini-basket-general-box'>
            <div className={`basket-information-box ${isFixed ? 'fixedBar' : ''}`} id='mini-basket-box'>
                <h2>Sipariş Özeti</h2>
                <p className="dividing-line"></p>
                <div style={{ marginBottom: "10px" }} className="product-amount-and-price-box">
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
                    <p style={{ marginLeft: "20px" }} className="total-price">12.450.000₺</p>
                </div>
                <div className="checkout-button-box">
                    <button onClick={onGoVerification} className="checkout-btn">Onayla</button>
                </div>
            </div>
        </div>
    );
}

export default MiniBasketInfo;
