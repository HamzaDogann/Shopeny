import "./ConfirmationStep.scss";
import ProductBox from "../../../assets/images/Orders/ProductBox.png";
import MacBookPro from "../../../assets/images/productPhotoMain.jpg"
import GoBackStepButton from '../../../components/CheckoutPagesComponents/GoBackStepButton';
import ProductItemCard from "../../../shared/components/OrderProductItemCard/ProductItemCard";

import { FaLocationDot } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { formatCardNumber } from "../../../shared/utils/formatCardNumber";
import { opacityEffect } from "../../../shared/animations/animations";
import { motion } from "framer-motion"

function ConfirmationStep({ onBack }) {

  const { information, basketProducts } = useSelector(state => state.basket);
  const { paymentInformations } = useSelector(state => state.paymentProcess);
  const { selectedAddressId } = useSelector(state => state.paymentProcess);
  const { addresses } = useSelector(state => state.addresses);

  const selectedAddress = addresses.find(address => address.addressId === selectedAddressId);

  return (

    <motion.div {...opacityEffect(0.5)}>
      <h2>Sipariş Detayları</h2>

      <div className='order-details-box'>
        <div className="products-general-box">
          <div className="products-title-box">
            <img src={ProductBox} alt="" />
            <p>Ürünler (Toplam {information.productsNumber} Ürün)</p>
          </div>
          <div className="all-products">
            <div className="products-box">
              {basketProducts.map(product => (
                <ProductItemCard
                  key={product.referenceId}
                  product={product}
                />
              ))}
            </div>
          </div>

        </div>

        <div className="delivery-address-box">
          <div className="title-box">
            <FaLocationDot className="icon" />
            <p>Teslim Adresi</p>
          </div>
          <div className='address-card'>
            {selectedAddress ? (
              <div className='address-informations'>
                <p className='address-title'>{selectedAddress.addressTitle}</p>
                <p className='address-name'>
                  {selectedAddress.street}, {selectedAddress.neighborhood},
                  {selectedAddress.district}, {selectedAddress.city}
                  {selectedAddress.postalCode}
                </p>
                <p className='address-recipient'>Alıcı: {selectedAddress.recipientName}</p>
              </div>
            ) : (
              <p>Adres seçilmedi</p>
            )}
          </div>
        </div>

        <div className="payment-info-box">
          <div className="title-box">
            <FaCreditCard className="icon" />
            <p>Ödeme Bilgisi</p>
          </div>

          <div className="payment-card-informations">
            <p> <strong>{formatCardNumber(paymentInformations.cardNumber)}</strong> Numaralı Kredi/Banka Kartı</p>
          </div>
        </div>

      </div >
      <GoBackStepButton onBack={onBack} />
    </motion.div>
  )
}

export default ConfirmationStep