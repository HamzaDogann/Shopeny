import React, { useEffect, useRef, useState } from 'react';
import { FaTruck } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiDiscountPercentFill } from "react-icons/ri";
import { formatPrice } from "../../utils/formatPrice"

import "./BasketInformations.scss";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, removePromotion, updateCargoType, updatePromotion } from '../../../store/slices/Basket/basketSlice';
import { customErrorToast, customSuccessToast } from '../../utils/CustomToasts';
import useEffectSkipFirstRender from '../../utils/useEffectSkipFirstRender';

function BasketInformations({ checkoutButton, currentStep, onGoPayment, onGoConfirm }) {

    const dispatch = useDispatch();

    const [isFixed, setIsFixed] = useState(false);
    const { information, error } = useSelector(state => state.basket);
    const [selectedCargo, setSelectedCargo] = useState(information.cargoType);
    const [promotionCode, setPromotionCode] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (information.cargoType === "normal") {
            setSelectedCargo("Normal Kargo");
        }
        else {
            setSelectedCargo("Hızlı Kargo");
        }
    }, [information.cargoType]);


    useEffect(() => {
        if (error === "wrong-promotion") {
            customErrorToast("Promosyon Geçersiz", 16, 2500);
            dispatch(clearError());
        }
    }, [error]);


    useEffectSkipFirstRender(() => {
        if (information.promotion) {
            customSuccessToast("Promosyon Uygulandı");
            setPromotionCode("");
        }
    }, [information.promotion]);

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


    const handleSelectChange = (link) => {
        setSelectedCargo(link.label);
        dispatch(updateCargoType(link.path));
        setIsDropdownOpen(false);
    };

    const handlePromotion = () => {
        if (promotionCode.length > 0) {
            dispatch(updatePromotion(promotionCode));
        }
        else {
            customErrorToast("Lütfen bir promosyon kodu girin", 16, 2600);
        }

    };
    const handleRemovePromotion = () => {
        dispatch(removePromotion());
        customSuccessToast("Promosyon Kaldırıldı");
    }

    const navLinks = [
        { path: 'normal', label: 'Normal Kargo', description: "Standart teslimat süresi", icon: <FaTruck /> },
        { path: 'express', label: 'Hızlı Kargo', description: "Ek ücret uygulanır", icon: <FaTruckFast /> }
    ];

    const renderCheckoutButton = () => {
        switch (currentStep) {
            case 0:
                return <button onClick={onGoPayment} className="checkout-btn">Ödemeye Geç</button>;
            case 1:
                return <button onClick={onGoConfirm} className="checkout-btn">Siparişi Onayla</button>;
            case 2:
                return <button className="checkout-btn">Onayla</button>;
            default:
                return null;
        }
    };

    return (
        <div className={`basket-information-box ${isFixed ? 'fixedBar' : ''}`}>
            <h2>Sepet Bilgisi</h2>
            <div className="product-amount-and-price-box">
                <p>{information.productsNumber} Ürün</p>
                <p>{formatPrice(information.productPrices)}₺</p>
            </div>

            <h2>Teslimat</h2>
            <div className="choose-cargo-box">
                <div className="custom-select" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <div className="selected-box">
                        <span className="selected">{selectedCargo}</span>
                        <RiArrowDownSLine className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} />
                    </div>
                    {isDropdownOpen && (
                        <div className="select-options">
                            {navLinks.map((link, index) => (
                                <div key={index} className="option" onClick={() => handleSelectChange(link)}>
                                    {link.icon}
                                    <span>{link.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <p className='fast-cargo-warning'>{selectedCargo === "Hızlı Kargo" && "Hızlı kargolar için ek ücret uygulanır"}</p>
            </div>

            <h2>Promosyon</h2>
            <div className="promotion-box">
                {information.promotion ?
                    <>
                        <div className='promotion-active'>
                            <p>
                                <RiDiscountPercentFill className='icon' />
                                <span>Promosyon Kullanıldı</span>
                            </p>
                            <button onClick={handleRemovePromotion}>Kaldır</button>
                        </div>
                    </>
                    :
                    <>
                        <input type="text"
                            onChange={(e) => setPromotionCode(e.target.value)}
                            value={promotionCode}
                            placeholder="Bir promosyon kodu giriniz" />
                        <button onClick={handlePromotion} className="confirm-promotion-btn">Uygula</button>
                    </>
                }
            </div>
            <p className="dividing-line"></p>
            <div className="total-promotion-and-cargo-prices-box">
                <div className="price-box">
                    <p>Promosyon İndirimi</p>
                    <span className="promotion-discount">{information.promotionDiscount}%</span>
                </div>
                <div className="price-box">
                    <p>Kargo Ücreti</p>
                    <span className="cargo-price" style={{ color: information.cargoType === "express" ? "#eb5a5a" : "#2fb460" }}>
                        +{information.cargoPrice}₺
                    </span>
                </div>
            </div>
            <p className="dividing-line"></p>
            <div className="basket-total-price-box">
                <p>Toplam Tutar</p>
                <p className="total-price">{formatPrice(information.totalPrice)}₺</p>
            </div>
            <div className="checkout-button-box">
                {checkoutButton ? checkoutButton : renderCheckoutButton()}
            </div>
        </div >
    );
}

export default BasketInformations;
