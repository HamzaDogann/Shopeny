import "./ConfirmationStep.scss";
import ProductBox from "../../../assets/images/Orders/ProductBox.png";
import MacBookPro from "../../../assets/images/productPhotoMain.jpg"
import GoBackStepButton from '../../../components/CheckoutPagesComponents/GoBackStepButton';
import ProductItemCard from "../../../shared/components/OrderProductItemCard/ProductItemCard";

import { FaLocationDot } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

function ConfirmationStep({ onBack }) {

  const dummyAddress = {
    addressTitle: "İş yeri",
    city: "İstanbul",
    district: "Kadıköy",
    neighborhood: "Barbaros",
    street: "Ata Cad. No:123 D:5",
    postalCode: "34750",
    recipientName: "Hamza Doğan"
  };

  return (
    <>
      <h2>Sipariş Detayları</h2>
     
      <div className='order-details-box'>
        <div className="products-general-box">
          <div className="products-title-box">
            <img src={ProductBox} alt="" />
            <p>Ürünler (Toplam 4 Ürün)</p>
          </div>
          <div className="all-products">
            <div className="products-box">

              <ProductItemCard
                image={MacBookPro}
                brand={"Apple"}
                productName={"Macbook Pro 15 Inc Ultra Vision Edition"}
                price={434424}
                quantity={10}
              />

              <ProductItemCard
                image={MacBookPro}
                brand={"Apple"}
                productName={"Macbook Pro 15 Inc Ultra Vision Edition"}
                price={434424}
                quantity={10}
              />

              <ProductItemCard
                image={MacBookPro}
                brand={"Apple"}
                productName={"Macbook Pro 15 Inc Ultra Vision Edition"}
                price={434424}
                quantity={10}
              />
              <ProductItemCard
                image={MacBookPro}
                brand={"Apple"}
                productName={"Macbook Pro 15 Inc Ultra Vision Edition"}
                price={434424}
                quantity={10}
              />
              <ProductItemCard
                image={MacBookPro}
                brand={"Apple"}
                productName={"Macbook Pro 15 Inc Ultra Vision Edition"}
                price={434424}
                quantity={10}
              />
              <ProductItemCard
                image={MacBookPro}
                brand={"Apple"}
                productName={"Macbook Pro 15 Inc Ultra Vision Edition"}
                price={434424}
                quantity={10}
              />

            </div>
          </div>

        </div>

        <div className="delivery-address-box">
          <div className="title-box">
            <FaLocationDot className="icon" />
            <p>Teslim Adresi</p>
          </div>
          <div className='address-card'>
            <div className='address-informations'>
              <p className='address-title'>{dummyAddress.addressTitle}</p>
              <p className='address-name'>{dummyAddress.street}, {dummyAddress.neighborhood}, {dummyAddress.district}, {dummyAddress.city} {dummyAddress.postalCode}</p>
              <p className='address-recipient'>Alıcı: {dummyAddress.recipientName}</p>
            </div>
          </div>
        </div>

        <div className="payment-info-box">
          <div className="title-box">
            <FaCreditCard className="icon" />
            <p>Ödeme Bilgisi</p>
          </div>

          <div className="payment-card-informations">
            <p><strong>4242 9429 4294 9249</strong> Numaralı Kredi/Banka Kartı</p>
          </div>
        </div>

      </div>
      <GoBackStepButton onBack={onBack} />
    </>
  )
}

export default ConfirmationStep