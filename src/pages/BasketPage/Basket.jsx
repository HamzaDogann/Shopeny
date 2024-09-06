import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import BasketProduct from "../../components/BasketPageComponents/BasketProduct";
import BasketInformations from "../../shared/components/BasketInfo/BasketInformations";
import PreLoader from "../../components/PreLoader/PreLoader";
import "./Basket.scss";
import { clearBasket } from "../../store/thunks/Basket/basketThunk";
import { customErrorToast, customSuccessToast } from "../../shared/utils/CustomToasts";
import { showModal } from "../../store/slices/confirmationModalSlice";
import ConfirmationModal from "../../shared/components/ConfirmationModal/ConfirmationModal";

import { motion } from 'framer-motion';
import { opacityAndTransformEffect } from "../../shared/animations/animations";

function Basket() {
  const dispatch = useDispatch();
  const { basketProducts, loading } = useSelector(state => state.basket);

  const thereAreProducts = basketProducts.length > 0;
  const navigate = useNavigate();

  const handleConfirmCart = () => {
    // Implement the checkout logic here
    navigate("/sepetim/odeme-islemleri");
  }


  const handleClearProcess = () => {
    dispatch(showModal({
      message: "Sepeti temizlemek istediğine emin misin?",
      confirmText: "Evet",
      cancelText: "Hayır"
    }));
  }

  const handleClearBasket = async () => {
    try {
      await dispatch(clearBasket());
      customSuccessToast("Sepet Temizlendi");
    } catch {
      customErrorToast("Sepet Temizlenemedi");
    }
  }

  return (
    <div className="basket-general-box">
      {loading && <PreLoader />}

      <div className="top-box">
        <motion.div {...opacityAndTransformEffect('x', -70, 0.7)} className="basket-title">
          <TiShoppingCart className="basket-icon" />
          <p>Sepetim</p>
        </motion.div>

        {thereAreProducts &&
          <button onClick={handleClearProcess} className="clear-basket-btn">
            <MdOutlineDeleteSweep className="delete-icon" />
            <span>Sepeti Temizle</span>
          </button>
        }

      </div>

      <div className="basket-boxs">
        {thereAreProducts ?
          <>
            <motion.div {...opacityAndTransformEffect('y', 14, 0.4)} className="products-box">
              {basketProducts.map(product => (
                <BasketProduct key={product.referenceId} product={product} />
              ))}
            </motion.div>
            <motion.div {...opacityAndTransformEffect('y', 14, 0.4)} className="basket-info-box">
              <BasketInformations checkoutButton={<button onClick={handleConfirmCart} className="checkout-btn">Sepeti Onayla</button>}
              />
            </motion.div>
          </>

          :
          <motion.div {...opacityAndTransformEffect('y', 29, 0.6)} className='there-are-no-content-box' >
            Sepete eklenmiş bir ürün bulunmuyor.
            <Link to={"/"} > Alışverişe Başla</Link>
          </motion.div>
        }
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal onConfirm={handleClearBasket} />
    </div>
  )
}

export default Basket

