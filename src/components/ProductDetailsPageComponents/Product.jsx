import { useState } from 'react';
import Rating from '@mui/material/Rating';
import { TfiCommentAlt } from "react-icons/tfi";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";

import { MdFavorite } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";

import { customErrorToast, customSuccessToast } from "../../shared/utils/CustomToasts"
import ProductSlider from './ProductSlider';
import { formatPrice } from '../../shared/utils/formatPrice';

function Product({ product }) {

    const colors = [
        { name: "Siyah", colorCode: "#1c1c1c" },
        { name: "Beyaz", colorCode: "#ffffff" },
        { name: "Yesil", colorCode: "#43b084" },
        { name: "Kırmızı", colorCode: "#d43737" },
        { name: "Mavi", colorCode: "#1b59cc" },
    ]

    //States
    const [selectedColor, setSelectedColor] = useState(product.productColors[0]);
    const [amount, setAmount] = useState(1);

    // Handle Color
    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    //Handle Copy
    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            customSuccessToast("Bağlantı Kopyalandı");
        }).catch(err => {
            customErrorToast("Bağlantı Kopyalanamadı");
        });
    };

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
    console.log(product)
    return (
        <div className='product-general-box'>
            <div className='product-box'>
                <div className='product-image-box'>
                    <ProductSlider productImages={product.productImages} />
                </div>
                <div className='product-details-box'>
                    <div className='about-the-product'>
                        <p className='product-brand'>{product.productBrand}</p>
                        <h2 className='product-name'>{product.productName}</h2>
                        <span className='product-description'>{product.productDescription}</span>
                        <div className='reviews-box'>
                            <div className='rating-box'>
                                <Rating name="read-only" value={product.productStar} precision={0.5} size="small" readOnly />
                                <span>{product.productStar}</span>
                            </div>
                            <span className='comment-status'>
                                <TfiCommentAlt />
                                <p>Bu ürüne {product.productComments.length} yorum var</p>
                            </span>
                        </div>
                        <p className='distinction'></p>
                    </div>
                    <div className='product-buy-process-box'>
                        <p className='color-title'>Renkler</p>
                        <div className='choose-color-box'>
                            {product.productColors.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleColorClick(color)}
                                    style={{
                                        backgroundColor: color,
                                        border: selectedColor === color ? '4px solid #b0b0b0' : '4px solid #e0e0e0',
                                    }}
                                >
                                </button>
                            ))}

                        </div>
                        <div className='product-price-info'>
                            <strike>{formatPrice(product.productNormalPrice)}₺</strike>
                            <span className='discount'>
                                <BiSolidDiscount style={{ fontSize: "20px" }} /> %{product.discountRate}
                            </span>
                        </div>
                        <p className='discounted-price'>{formatPrice(product.discountedPrice)}₺</p>

                        {!product.isStock
                            ?
                            <div className='no-stock'>Bu ürün stokta kalmadı</div>
                            :
                            <div className='amount-and-add-basket-box'>
                                <div className='amount-box'>
                                    <button className='amount-buttons' onClick={decrementAmount}>-</button>
                                    <span className='amount-value'>{amount}</span>
                                    <button className='amount-buttons' onClick={incrementAmount}>+</button>
                                </div>

                                <button className='add-basket'>
                                    <HiMiniShoppingBag />
                                    <span>Sepete Ekle</span>
                                </button>
                            </div>}
                    </div>

                    <div className='top-buttons'>
                        <button><MdFavorite /></button>
                        <button onClick={() => copyUrl()}><IoShareSocialSharp /></button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Product