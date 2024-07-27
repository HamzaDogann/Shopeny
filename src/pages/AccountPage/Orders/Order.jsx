import { Link } from "react-router-dom";
import OrderCard from "../../../features/AccountPageComponents/OrderCard"
import "./Order.scss";
import NoOrder from "../../../assets/images/Orders/NoOrder.png"
import NoContent from "../../../features/AccountPageComponents/NoContent";
function Order() {

  const siparisVarMi = true;
  return (
    <div className='orders-box'>
      {siparisVarMi
        ? <>
          <h2>Siparişlerim</h2>
          <div className='orders'>
            <OrderCard />
            <OrderCard />
          </div>
        </>
        :
        <NoContent image={NoOrder} description="Aktif siparişiniz bulunmuyor" buttonText="Alışverişe Başla" path="/"/>
      }

    </div>
  )
}

export default Order