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
        <div className="basket-title">
          <TiShoppingCart className="basket-icon" />
          <p>Sepetim</p>
        </div>

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
            <div className="products-box">
              {basketProducts.map(product => (
                <BasketProduct key={product.referenceId} product={product} />
              ))}
            </div>
            <div className="basket-info-box">
              <BasketInformations checkoutButton={<button onClick={handleConfirmCart} className="checkout-btn">Sepeti Onayla</button>}
              />
            </div>
          </>

          :
          <div className='there-are-no-content-box' >
            Sepete eklenmiş bir ürün bulunmuyor.
            <Link to={"/"} > Alışverişe Başla</Link>
          </div>
        }
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal onConfirm={handleClearBasket} />
    </div>
  )
}

export default Basket

