import OrderCard from "../../../features/AccountPageComponents/OrderCard"
import "./Order.scss";
function Order() {

  const siparisVarMi = true;
  return (
    <div className='orders-box'>
      {siparisVarMi 
      ?  <>
          <h2>Siparişlerim</h2>
          <div className='orders'>
            <OrderCard />
            <OrderCard />
          </div>
        </>
      : <div></div>
      }

    </div>
  )
}

export default Order