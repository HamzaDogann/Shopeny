import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrderCard from "../../../components/AccountPageComponents/OrderCard";
import NoOrder from "../../../assets/images/Orders/NoOrder.png";
import NoContent from "../../../components/AccountPageComponents/NoContent";
import { motion } from 'framer-motion';
import { fetchOrders, removeOrder } from "../../../store/thunks/User/ordersThunk";
import { customErrorToast, customSuccessToast } from "../../../shared/utils/CustomToasts";
import ConfirmationModal from "../../../shared/components/ConfirmationModal/ConfirmationModal";
import { showModal } from "../../../store/slices/confirmationModalSlice";
import "./Order.scss";
import { createContainerVariants, createItemVariants, opacityAndTransformEffect } from "../../../shared/animations/animations";
import PreLoader from "../../../components/PreLoader/PreLoader";
function Order() {

  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
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

  if (loading) {
    return null;
  }

  return (
    <>
      <div className='orders-box'>
        {orders.length > 0 ? (
          <>
            <motion.h2 {...opacityAndTransformEffect('y', 20, 0.4)}>
              Siparişlerim
            </motion.h2>

            <motion.div className='orders' variants={createContainerVariants(0.6, 0.3)} initial="hidden" animate="visible">
              {orders.map((order) => (
                <motion.div key={order.orderId} variants={createItemVariants(20, 0)}>
                  <OrderCard onDelete={handleDeleteProcess} order={order} />
                </motion.div>
              ))}
            </motion.div>

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
