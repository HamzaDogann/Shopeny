import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderCard from "../../../components/AccountPageComponents/OrderCard";
import NoOrder from "../../../assets/images/Orders/NoOrder.png";
import NoContent from "../../../components/AccountPageComponents/NoContent";

import { fetchOrders, removeOrder } from "../../../store/thunks/User/ordersThunk";
import { customErrorToast, customSuccessToast } from "../../../shared/utils/CustomToasts";
import ConfirmationModal from "../../../shared/components/ConfirmationModal/ConfirmationModal";
import { showModal } from "../../../store/slices/confirmationModalSlice";
import "./Order.scss";
function Order() {

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {

    if (orders.length === 0) {
        dispatch(fetchOrders());
    }
}, [dispatch, orders.length]);

  //Delete Order
  const handleDeleteProcess = (orderId) => {
    dispatch(showModal({
      message: "Bu siparişi iptal etmek istediğinize emin misiniz?",
      confirmText: "Evet",
      cancelText: "Hayır"
    }));
    setOrderId(orderId);
  }

  const handleConfirm = async () => {
    try {
      await dispatch(removeOrder({ orderId: orderId })).unwrap();
      customSuccessToast("Sipariş iptal edildi", 2200);
    } catch (error) {
      customErrorToast("Sipariş İptal Edilemedi", 16, 2600);
    }
  };

  return (
    <>
      <div className='orders-box'>
        {orders.length > 0 ? (
          <>
            <h2>Siparişlerim</h2>
            <div className='orders'>
              {orders.map((order) => (
                <OrderCard
                  onDelete={handleDeleteProcess}
                  key={order.orderId} order={order} />
              ))}
            </div>
          </>
        ) : (
          <NoContent
            image={NoOrder}
            description="Aktif siparişiniz bulunmuyor"
            buttonText="Alışverişe Başla"
            path="/"
          />
        )}
      </div>
      <ConfirmationModal
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default Order;
