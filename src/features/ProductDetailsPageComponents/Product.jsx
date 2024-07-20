import { useState } from 'react';
import Rating from '@mui/material/Rating';
import { TfiCommentAlt } from "react-icons/tfi";
import { TbShoppingCartPlus } from "react-icons/tb";
import { MdFavorite } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";

import { customErrorToast, customSuccessToast } from "../../shared/utils/CustomToasts"

function Product() {

    const colors = [
        { name: "Siyah", colorCode: "#1c1c1c" },
        { name: "Beyaz", colorCode: "#ffffff" },
        { name: "Yesil", colorCode: "#43b084" },
        { name: "Kırmızı", colorCode: "#d43737" },
        { name: "Mavi", colorCode: "#1b59cc" },
    ]

    //States
    const [selectedColor, setSelectedColor] = useState(null);
    const [amount, setAmount] = useState(1);

    // Handle Color
    const handleColorClick = (color) => {
        setSelectedColor(color.name);
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

    return (
        <div className='product-general-box'>
            <div className='product-box'>
                <div className='product-image-box'>

                </div>
                <div className='product-details-box'>
                    <div className='about-the-product'>
                        <p className='product-brand'>Apple</p>
                        <h2 className='product-name'>MacBook Pro 16 Inc M2 Pro</h2>
                        <span className='product-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laborum dolorum magni quia, recusandae.</span>
                        <div className='reviews-box'>
                            <div className='rating-box'>
                                <Rating name="read-only" value={5} size="small" readOnly />
                                <span>5</span>
                            </div>
                            <span className='comment-status'>
                                <TfiCommentAlt />
                                <p>Bu ürüne 2 yorum var</p>
                            </span>
                        </div>
                        <p className='distinction'></p>
                    </div>


                    <div className='product-buy-process-box'>
                        <p className='color-title'>Renk</p>
                        <div className='choose-color-box'>
                            {colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => handleColorClick(color)}
                                    style={{
                                        backgroundColor: color.colorCode,
                                        border: selectedColor === color.name ? '4px solid #b0b0b0' : '4px solid #e0e0e0',
                                    }}
                                >
                                </button>
                            ))}
                        </div>
                        <div className='product-price-info'>
                            <strike>80.000₺</strike>
                            <span className='discount'>
                                <BiSolidDiscount style={{ fontSize: "20px" }} /> %50
                            </span>
                        </div>
                        <p className='discounted-price'>40.000₺</p>

                        <div className='amount-and-add-basket-box'>
                            <div className='amount-box'>
                                <button className='amount-buttons' onClick={decrementAmount}>-</button>
                                <span className='amount-value'>{amount}</span>
                                <button className='amount-buttons' onClick={incrementAmount}>+</button>
                            </div>

                            <button className='add-basket'>
                                <TbShoppingCartPlus />
                                <span>Sepete Ekle</span>
                            </button>
                        </div>

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