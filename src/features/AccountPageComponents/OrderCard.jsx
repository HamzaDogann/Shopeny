import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import ProductBox from "./../../assets/images/Orders/ProductBox.png";
import { MdAccessTimeFilled } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import Macbook from "../../assets/images/productPhotoMain.jpg"
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/features/ConfirmationModal/Modal';
import ConfirmationModal from '../../shared/components/ConfirmationModal/ConfirmationModal';
import { customSuccessToast } from '../../shared/utils/CustomToasts';

function OrderCard() {

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };


    const handleCancelOrder = () => {
        dispatch(showModal({
            message: 'Bu siparişi iptal etmek istediğine emin misin?',
            confirmText: 'Evet',
            cancelText: 'Hayır',
        }));
    };

    const handleConfirm = () => {
        customSuccessToast("Sipariş iptal edildi");
    };

    const handleCancel = () => {
    };


    return (
        <div className={`order-card ${isOpen ? 'open' : ''}`} >
            <div className="order-card-header" onClick={toggleCard}>
                <div className="order-card-icon">
                    <img src={ProductBox} />
                </div>
                <div className="order-card-info">
                    <span>Toplam 8 Ürün</span>
                    <span className="order-card-status"><MdAccessTimeFilled className='icon' />Onay Bekliyor</span>
                    <span className="order-card-date"><LuCalendarDays className='icon' /> 06.07.2024</span>
                </div>
                <IoIosArrowDown className="arrow-icon" />
            </div>
            <div className="order-card-details">
                <div className="order-item">
                    <img src={Macbook} alt="" />
                    <div className="item-info">
                        <div className='item-name-and-brand-box'>
                            <span>Apple</span>
                            <p>MacBook Pro M4</p>
                        </div>

                        <span className="item-quantity">8</span>
                        <span className="item-price">150.000 ₺</span>
                    </div>
                </div>

                <div className="order-item">
                    <img src={Macbook} alt="" />
                    <div className="item-info">
                        <div className='item-name-and-brand-box'>
                            <span>Apple</span>
                            <p>MacBook Pro M4</p>
                        </div>

                        <span className="item-quantity">8</span>
                        <span className="item-price">150.000 ₺</span>
                    </div>
                </div>
                <div className="order-item">
                    <img src={Macbook} alt="" />
                    <div className="item-info">
                        <div className='item-name-and-brand-box'>
                            <span>Apple</span>
                            <p>MacBook Pro M4</p>
                        </div>

                        <span className="item-quantity">8</span>
                        <span className="item-price">150.000 ₺</span>
                    </div>
                </div>
                <p className='dividing-line'></p>

                <div className='address-informations'>
                    <h2>Adres</h2>
                    <div className='address'>
                        <p className='address-title'>Adres Başlığı</p>
                        <p className='address-name'>Barbaros Mah., Ata Cad. No:123 D:5, Kadıköy, İstanbul 34750</p>
                        <p className='address-recipient'>Alıcı: <span>Hamza Doğan</span></p>
                    </div>
                </div>

                <p className='dividing-line'></p>

                <div className='manage-order-box'>
                    <button onClick={handleCancelOrder}>Siparişi İptal Et</button>
                    <span>Toplam : 250.000₺</span>
                </div>
            </div>
            <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel} />
        </div>
    );
}

export default OrderCard;
