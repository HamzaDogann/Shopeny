import React, { useState } from 'react';
import { FaTruck } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io"; 
import "./BasketInformations.scss";

function BasketInformations() {
    const [selectedCargo, setSelectedCargo] = useState("Normal Kargo");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSelectChange = (selected) => {
        setSelectedCargo(selected);
        setIsDropdownOpen(false); 
    };

    const navLinks = [
        { path: 'normal', label: 'Normal Kargo', description: "Standart teslimat süresi", icon: <FaTruck /> },
        { path: 'fast', label: 'Hızlı Kargo', description: "Ek ücret uygulanır", icon: <FaTruckFast /> }
    ];

    return (
        <div className="basket-information-box">
            <h2>Sepet Bilgisi</h2>
            <div className="product-amount-and-price-box">
                <p>8 Ürün</p>
                <p>350.000₺</p>
            </div>
            <p className="dividing-line"></p>
            <h2>Teslimat</h2>
            <div className="choose-cargo-box">
                <div className="custom-select" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <div className="selected-box">
                        <span className="selected">{selectedCargo}</span>
                        <IoMdArrowDropdown className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} />
                    </div>
                    {isDropdownOpen && (
                        <div className="select-options">
                            {navLinks.map((link, index) => (
                                <div key={index} className="option" onClick={() => handleSelectChange(link.label)}>
                                    {link.icon}
                                    <span>{link.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <p className='fast-cargo-warning'>{selectedCargo === "Hızlı Kargo" && "Hızlı kargolar için ek ücret uygulanır"}</p>
            </div>
            <p className="dividing-line"></p>
            <h2>Promosyon</h2>
            <div className="promotion-box">
                <input type="text" placeholder="İndirim için promosyon kodu giriniz" />
                <button className="confirm-promotion-btn">Uygula</button>
            </div>
            <p className="dividing-line"></p>
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
                <button className="checkout-btn">Sepeti Onayla</button>
            </div>
        </div>
    );
}

export default BasketInformations;
