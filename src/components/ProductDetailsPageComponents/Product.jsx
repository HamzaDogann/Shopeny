import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../../store/utils/getUserId';

import ProductSlider from './ProductSlider';
import PreLoader from '../PreLoader/PreLoader';

import Rating from '@mui/material/Rating';
import { MdFavorite } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";
import { TfiCommentAlt } from "react-icons/tfi";
import { TbShoppingBag } from "react-icons/tb";
import { TbShoppingBagCheck } from "react-icons/tb";

import { customErrorToast, customSuccessToast } from "../../shared/utils/CustomToasts"
import { formatPrice } from '../../shared/utils/formatPrice';
import { translateCategoryNameToEnglish } from '../../constants/categories';
import { addFavoriteProduct, removeFavoriteProduct } from '../../store/thunks/User/favoriteProductThunk';
import { addProductToBasket } from '../../store/thunks/Basket/basketThunk';
import { clearError } from '../../store/slices/Basket/basketSlice';

function Product({ product }) {

    const userId = getUserId();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //========================States==========================

    const { favoriteProductsRef, loading } = useSelector(state => state.favoriteProducts)
    const [isFavoriteProduct, setIsFavoriteProduct] = useState();
    const [isAddedBasket, setIsAddedBasket] = useState(false);
    const [selectedColor, setSelectedColor] = useState(product.productColors[0]);
    const [amount, setAmount] = useState(1);

    //======================Data Process=======================

    //Is Favorite?
    useEffect(() => {
        const isFavorite = favoriteProductsRef.some(ref =>
            ref.categoryName === translateCategoryNameToEnglish(product.categoryName) &&
            ref.productId === product.Id
        );
        setIsFavoriteProduct(isFavorite);
    }, [favoriteProductsRef]);

    //Add Favorite Product
    const handleAddToFavorites = async () => {

        if (userId) {
            try {
                await dispatch(addFavoriteProduct({ userId, categoryName: translateCategoryNameToEnglish(product.categoryName), productId: product.Id }));
                customSuccessToast("Favorilere Eklendi", 1800);
                setIsFavoriteProduct(true);
            } catch (error) {
                customErrorToast("Favorilere Eklenemedi");
            }
        }
        else {
            navigate("/giris-yap");
        }

    }
    //Remove Favorite Product
    const handleRemoveFromFavorites = async () => {
        try {
            const favoriteProduct = favoriteProductsRef.find(ref => ref.categoryName === translateCategoryNameToEnglish(product.categoryName) && ref.productId === product.Id);
            if (favoriteProduct) {
                await dispatch(removeFavoriteProduct({
                    userId, categoryName: favoriteProduct.categoryName, productId: favoriteProduct.productId
                }));
                setIsFavoriteProduct(false);
                customSuccessToast("Favorilerden Çıkarıldı", 1800);
            }
        } catch (error) {
            customErrorToast("Favorilere çıkarılamadı", error.message);
        }
    };

    //Handle Copy Product Link
    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            customSuccessToast("Bağlantı Kopyalandı");
        }).catch(err => {
            customErrorToast("Bağlantı Kopyalanamadı");
        });
    };

    //=========== Data Process for basket===========

    const handleAddToCart = async (event) => {

        if (userId) {
            if (!isAddedBasket) {
                event.stopPropagation();
                dispatch(clearError());

                try {
                    const resultAction = await dispatch(addProductToBasket({
                        uid: userId, product: product, color: selectedColor, amount: amount
                    }));

                    if (addProductToBasket.fulfilled.match(resultAction)) {
                        customSuccessToast("Sepete Eklendi", 1800);
                        setIsAddedBasket(true);
                        setTimeout(() => {
                            setIsAddedBasket(false);
                        }, 2000);
                    } else if (addProductToBasket.rejected.match(resultAction)) {
                        const error = resultAction.payload?.error;

                        if (error === "product-limit") {
                            customErrorToast(" Aynı üründen en fazla 5 tane ekleyebilirsiniz", 16, 3000);
                        } else {
                            customErrorToast("Ürün sepete eklenirken bir hata oluştu", 16, 2000);
                        }
                    }
                } catch {
                    customErrorToast("Beklenmeyen bir hata oluştu", 14, 2000);
                }
            }
        }
        else {
            navigate("/giris-yap");
        }

    };

    //handle Color
    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    //Handle Amount
    const incrementAmount = () => {
        if (amount < 5) {
            setAmount(amount + 1);
        } else {
            customErrorToast("En fazla 5 tane alabilirsin")
        }
    };

    const decrementAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };

    console.log(product)
    //========================JSX==========================

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
                                        scale: selectedColor == color ? "1.2" : "1"
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


                                <button
                                    onClick={handleAddToCart}
                                    className={`add-basket ${isAddedBasket ? 'added' : ''}`}>
                                    {isAddedBasket ?
                                        <>  <TbShoppingBagCheck className='icon' />
                                            <span>Sepete Eklendi</span>
                                        </>
                                        :
                                        <>
                                            <TbShoppingBag className='icon' />
                                            <span>Sepete Ekle</span>
                                        </>
                                    }
                                </button>
                            </div>}
                    </div>

                    <div className='top-buttons'>
                        {isFavoriteProduct
                            ? <button onClick={handleRemoveFromFavorites}><MdFavorite style={{ color: "#f55252" }} /></button>
                            : <button onClick={handleAddToFavorites} ><MdFavorite /></button>
                        }
                        {loading && <PreLoader />}
                        <button onClick={() => copyUrl()}><IoShareSocialSharp /></button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Product