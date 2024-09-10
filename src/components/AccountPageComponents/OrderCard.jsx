import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import ProductBox from "./../../assets/images/Orders/ProductBox.png";
import { MdAccessTimeFilled } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";

import ProductItemCard from '../../shared/components/OrderProductItemCard/ProductItemCard';
import { formatPrice } from '../../shared/utils/formatPrice';


function OrderCard({ order, onDelete }) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`order-card ${isOpen ? 'open' : ''}`} >
            <div className="order-card-header" onClick={toggleCard}>
                <div className="order-card-icon">
                    <img src={ProductBox} />
                </div>
                <div className="order-card-info">
                    <span>Toplam {order.information.productsNumber} Ürün</span>
                    <span className="order-card-status"><MdAccessTimeFilled className='icon' />{order.status}</span>
                    <span className="order-card-date"><LuCalendarDays className='icon' />{order.date}</span>
                </div>
                <IoIosArrowDown className="arrow-icon" />
            </div>
            <div className="order-card-details">
                <div className='order-items'>
                    {order.basketProducts.map(product => (
                        <ProductItemCard
                            key={product.referenceId} product={product}
                        />
                    ))}
                </div>
                <p className='dividing-line'></p>

                <div className='address-informations'>

                    <div className='address'>
                        <p className='address-title'>{order.address.addressTitle}</p>
                        <p className='address-name'>
                            {order.address.street}, {order.address.neighborhood}, {order.address.district}, {order.address.city}, {order.address.postalCode}
                        </p>
                        <p className='address-recipient'>Alıcı: <span>{order.address.recipientName}</span></p>
                    </div>
                </div>

                <p className='dividing-line'></p>

                <div className='manage-order-box'>
                    <button onClick={() => onDelete(order.orderId)}>Siparişi İptal Et</button>
                    <span>Toplam : {formatPrice(order.information.totalPrice)}₺</span>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;
