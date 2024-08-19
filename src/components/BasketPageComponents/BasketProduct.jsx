import React, { useEffect, useState } from 'react'
import truncateName from "../../shared/utils/truncateName";
import { AiFillDelete } from "react-icons/ai";
import { formatPrice } from '../../shared/utils/formatPrice';
import { useDispatch } from 'react-redux';
import useDebounce from '../../shared/hooks/useDebounce';
import { removeBasketProduct, updateBasketProductAmount } from '../../store/thunks/Basket/basketThunk';
import { customErrorToast, customSuccessToast } from '../../shared/utils/CustomToasts';
import { useNavigate } from 'react-router-dom';
import { translateCategoryNameToTurkish } from "../../constants/categories";
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import { slugify } from '../../shared/utils/slugify';
import useLazyImage from '../../shared/hooks/useLazyImage';
import { Skeleton } from '@mui/material';

function BasketProduct({ product }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [amount, setAmount] = useState(product.amount);
    const debouncedAmount = useDebounce(amount, 500);

    const { imageStyle, skeletonProps, onLoad } = useLazyImage({
        src: product.mainImage,
        width: 110,
        height: 110,
        borderRadius: "12px"
    });


    useEffect(() => {
        if (debouncedAmount !== product.amount) {
            const amountDelta = debouncedAmount - product.amount;
            dispatch(updateBasketProductAmount({ referenceId: product.referenceId, amountDelta }));
        }
    }, [debouncedAmount, dispatch, product.amount]);

    const incrementAmount = () => {
        if (amount < 5) {
            setAmount(amount + 1);
        } else {
            customErrorToast("En fazla 5 tane eklenebilir", 16, 1600);
        }
    };

    const decrementAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };


    const handleRemoveProductFromBasket = async () => {
        try {
            await dispatch(removeBasketProduct({ referenceId: product.referenceId }));
            customSuccessToast("Ürün sepetten çıkarıldı", 1500);
        } catch {
            customErrorToast("Sepetten çıkarma başarısız oldu");
        }

    }


    const handleProductLink = () => {
        navigate(`/${translateCategoryNameToTurkish(product.categoryName)}/${slugify(product.productName)}`);
    }

    return (
        <div className='basket-product'>
            <LazyLoadImage
                onClick={handleProductLink}
                src={product.mainImage}
                alt=""
                effect="blur"
                className='basket-product-image'
            
            />
            <div className='product-infos-box'>
                <p className='product-brand'>{product.productBrand}</p>
                <p onClick={handleProductLink} className='product-name'>{truncateName(product.productName, 30)}</p>
                <p className='product-price'>{formatPrice(product.discountedPrice)}₺</p>
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

            <button onClick={handleRemoveProductFromBasket} className='remove-product-from-basket-btn'>
                <AiFillDelete className='delete-icon' />
            </button>
        </div>

    )
}

export default BasketProduct