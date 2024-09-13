import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../utils/formatPrice';
import "../BasketInfo/BasketInformations.scss";

function MiniBasketInfo({ onGoVerification }) {
    
    const [isFixed, setIsFixed] = useState(false);
    const { information } = useSelector(state => state.basket);

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
                    <p>{information.productsNumber} Ürün</p>
                    <p>{formatPrice(information.productPrices)}₺</p>
                </div>
                <div className="total-promotion-and-cargo-prices-box">
                    <div className="price-box">
                        <p>Promosyon İndirimi</p>
                        <span className="promotion-discount">{information.promotionDiscount}%</span>
                    </div>
                    <div className="price-box">
                        <p>Kargo Ücreti</p>
                        <span className="cargo-price">+{information.cargoPrice}₺</span>
                    </div>
                </div>
                <p className="dividing-line"></p>

                <div className="basket-total-price-box">
                    <p>Toplam Tutar</p>
                    <p style={{ marginLeft: "20px" }} className="total-price">{formatPrice(information.totalPrice)}₺</p>
                </div>
                <div className="checkout-button-box">
                    <button onClick={onGoVerification} className="checkout-btn">Onayla</button>
                </div>
            </div>
        </div>
    );
}

export default MiniBasketInfo;
