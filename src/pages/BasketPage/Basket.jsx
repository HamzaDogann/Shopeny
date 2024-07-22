import ShopenyBag from "../../assets/logo/ShopenyBag.png";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import BasketProduct from "../../features/BasketPageComponents/BasketProduct";
import BasketInformations from "../../shared/components/BasketInfo/BasketInformations";

import "./Basket.scss";

function Basket() {
  return (
    <div className="basket-general-box">
      <div className="top-box">
        <div className="basket-title">
          <TiShoppingCart className="basket-icon" />
          <p>Sepetim</p>
        </div>
        <button className="clear-basket-btn">
          <MdOutlineDeleteSweep className="delete-icon" />
          <span>Sepeti Temizle</span>
        </button>
      </div>

      <div className="basket-boxs">
        <div className="products-box">
          <BasketProduct />
          <BasketProduct />
          <BasketProduct />
        </div>
        <div className="basket-info-box">
          <BasketInformations />
        </div>
      </div>

    </div>
  )
}

export default Basket