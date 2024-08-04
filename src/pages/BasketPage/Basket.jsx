import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import BasketProduct from "../../components/BasketPageComponents/BasketProduct";
import BasketInformations from "../../shared/components/BasketInfo/BasketInformations";
import { useLocation } from 'react-router-dom';
import "./Basket.scss";


function Basket() {

  const basketProduct = true;
  const navigate = useNavigate();
  const location = useLocation();


  const handleConfirmCart = () => {
    // Implement the checkout logic here
    navigate("/sepetim/odeme-islemleri");
  }

  return (
    <div className="basket-general-box">
      <div className="top-box">
        <div className="basket-title">
          <TiShoppingCart className="basket-icon" />
          <p>Sepetim</p>
        </div>
        {basketProduct &&
          <button className="clear-basket-btn">
            <MdOutlineDeleteSweep className="delete-icon" />
            <span>Sepeti Temizle</span>
          </button>}

      </div>

      <div className="basket-boxs">
        {basketProduct ?
          <>
            <div className="products-box">
              <BasketProduct />
              <BasketProduct />
              <BasketProduct />
            </div>
            <div className="basket-info-box">
              <BasketInformations checkoutButton={<button onClick={handleConfirmCart} className="checkout-btn">Sepeti Onayla</button>}
              />
            </div>
          </>

          :
          <div className='there-are-no-content-box' >
            Sepete eklenmiş ürün bulunmuyor.
            <Link to={"/"} > Alışverişe Başla</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Basket

