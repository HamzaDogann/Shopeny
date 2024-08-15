import React, { useEffect, useState } from 'react'
import truncateName from "../../shared/utils/truncateName";
import { AiFillDelete } from "react-icons/ai";
import { formatPrice } from '../../shared/utils/formatPrice';
import { useDispatch } from 'react-redux';
import useDebounce from '../../shared/hooks/useDebounce';
import { updateBasketProductAmount } from '../../store/thunks/Basket/basketThunk';
import { customErrorToast } from '../../shared/utils/CustomToasts';

function BasketProduct({ product }) {


    const [amount, setAmount] = useState(product.amount);
    const dispatch = useDispatch();
    const debouncedAmount = useDebounce(amount, 500);

    const incrementAmount = () => {
        if (amount < 10) {
            setAmount(amount + 1);
        } else {
            customErrorToast("En fazla 10 tane alabilirsin");
        }
    };

    const decrementAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };

    useEffect(() => {
        if (debouncedAmount !== product.amount) {
            const amountDelta = debouncedAmount - product.amount; // Hesapla
            dispatch(updateBasketProductAmount({ referenceId: product.referenceId, amountDelta }));
        }
    }, [debouncedAmount, dispatch, product.amount]);

    return (
        <div className='basket-product'>
            <img src={product.mainImage} alt="" />
            <div className='product-infos-box'>
                <p className='product-brand'>{product.productBrand}</p>
                <p className='product-name'>{truncateName(product.productName, 30)}</p>
                <p className='product-price'>{product.discountedPrice}</p>
                <p style={{ backgroundColor: product.color }} className='product-color'>
                </p>
            </div>

            <div className='amount-box'>
                <button className='amount-buttons' onClick={decrementAmount}>-</button>
                <span className='amount-value'>{amount}</span>
                <button className='amount-buttons' onClick={incrementAmount}>+</button>
            </div>

            <div className='total-price'>
                <p>{formatPrice(product.amount * product.discountedPrice)}₺</p>
            </div>

            <button className='remove-product-from-basket-btn'>
                <AiFillDelete className='delete-icon' />
            </button>
        </div>

    )
}

export default BasketProduct