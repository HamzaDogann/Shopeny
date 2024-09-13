import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import NoOrder from "../../../assets/images/Orders/NoOrder.png";

import OrderCard from "../../../components/AccountPageComponents/OrderCard";
import NoContent from "../../../components/AccountPageComponents/NoContent";

import { showModal } from "../../../store/slices/confirmationModalSlice";
import { fetchOrders, removeOrder } from "../../../store/thunks/User/ordersThunk";

import ConfirmationModal from "../../../shared/components/ConfirmationModal/ConfirmationModal";
import { customErrorToast, customSuccessToast } from "../../../shared/utils/CustomToasts";
import { createContainerVariants, createItemVariants, opacityAndTransformEffect } from "../../../shared/animations/animations";

import "./Order.scss";
function Order() {

  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchOrders());
    }
  }, [dispatch, orders.length]);


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
