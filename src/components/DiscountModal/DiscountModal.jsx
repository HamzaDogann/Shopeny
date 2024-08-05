import React, { useState, useEffect, memo } from 'react';
import DiscountBanner from "../../assets/images/DiscountBanner/DiscountBannerImage.png";
import { RiCloseFill } from "react-icons/ri";
import './DiscountModal.scss';

const DiscountModal = memo(({ isOpen, onClose }) => {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setClosing(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            onClose();
            setClosing(false);
        }, 1200);
    };


    if ((!isOpen && !closing)) return null;

    return (
        <div className={`modal-overlay ${closing ? 'closing' : ''}`}>
            <div className={`modal-discount ${closing ? 'closing' : ''}`}>
                <img src={DiscountBanner} alt="Discount Banner" />
                <button className='close-btn' onClick={handleClose}>
                    <RiCloseFill />
                </button>
            </div>
        </div>
    );
});

export default DiscountModal;