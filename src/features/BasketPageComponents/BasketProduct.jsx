import React, { useState } from 'react'
import productPhotoMain from "../../assets/images/productPhotoMain.jpg"
import truncateName from "../../shared/utils/truncateName";
import { AiFillDelete } from "react-icons/ai";

function BasketProduct() {

    const backgroundColor = '#336ecc'; // Example color
    const truncatedProductName = truncateName("MacBook Pro M4 16 Inc 500GB Ultra", 30);

    const [amount, setAmount] = useState(1);

    //Handle Amount
    const incrementAmount = () => {
        if (amount < 10) {
            setAmount(amount + 1);
        } else {
            customErrorToast("En fazla 10 tane alabilirsin")
        }
    };

    const decrementAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };

    return (
        <div className='basket-product'>
            <img src={productPhotoMain} alt="" />
            <div className='product-infos-box'>
                <p className='product-brand'>Apple</p>
                <p className='product-name'>{truncatedProductName}</p>
                <p className='product-price'>128.000₺</p>
                <p style={{ backgroundColor: backgroundColor }} className='product-color'>
                </p>
            </div>

            <div className='amount-box'>
                <button className='amount-buttons' onClick={decrementAmount}>-</button>
                <span className='amount-value'>{amount}</span>
                <button className='amount-buttons' onClick={incrementAmount}>+</button>
            </div>

            <div className='total-price'>
                <p>1.500.000₺</p>
            </div>

            <button className='remove-product-from-basket-btn'>
                <AiFillDelete className='delete-icon' />
            </button>
        </div>
    )
}

export default BasketProduct