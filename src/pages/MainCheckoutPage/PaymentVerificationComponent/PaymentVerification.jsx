import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import PreLoader from '../../../components/PreLoader/PreLoader';
import RemainingTime from '../../../components/CheckoutPagesComponents/RemainingTime';
import successfulIcon from "../../../assets/images/paymentVerification/successful_icon.png";

import Modal from '../../../shared/components/Modal/Modal';
import { formatPhoneNumber } from '../../../shared/utils/formatPhoneNumber';
import { customErrorToast } from '../../../shared/utils/CustomToasts';
import { formatPrice } from '../../../shared/utils/formatPrice';
import ConfirmationModal from '../../../shared/components/ConfirmationModal/ConfirmationModal';
import AnimationBackground from "../../../shared/components/AnimationBackground/AnimationBackground";

import { showModal } from '../../../store/slices/confirmationModalSlice';
import { clearBasket } from '../../../store/thunks/Basket/basketThunk';
import { addOrder, fetchOrders } from '../../../store/thunks/User/ordersThunk';

import "./PaymentVerification.scss";

function PaymentVerification({ onBack }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //========================STATES============================

  const { user } = useSelector(state => state.auth);
  const { information, basketProducts } = useSelector(state => state.basket);
  const { loading } = useSelector(state => state.orders);
  const { addresses } = useSelector(state => state.addresses);
  const { selectedAddressId } = useSelector(state => state.paymentProcess);
  const selectedAddress = addresses.find(address => address.addressId === selectedAddressId);
  const [verificationCode, setVerificationCode] = useState("");

  const [dateTime, setDateTime] = useState("");
  const [orderCreated, setOrderCreated] = useState(false);

  //========================EFFECTS============================

  useEffect(() => {
    const currentDateTime = new Date();
    const formattedDateTime = `${currentDateTime.getDate().toString().padStart(2, '0')}.${(currentDateTime.getMonth() + 1).toString().padStart(2, '0')}.${currentDateTime.getFullYear()} - ${currentDateTime.getHours().toString().padStart(2, '0')}:${currentDateTime.getMinutes().toString().padStart(2, '0')}`;
    setDateTime(formattedDateTime);
  }, []);

  //========================FUNCTIONS============================

  const handleCancelProcess = () => {
    dispatch(showModal({
      message: 'Ödeme işlemini iptal etmek istiyor musun?',
      confirmText: 'Evet',
      cancelText: 'Hayır',
    }));
  }

  const handleAcceptVerification = async () => {
    if (!verificationCode) {
      customErrorToast("Doğrulama Kodu Giriniz");
      return;
    }

    if (verificationCode == 12345) {
      const orderData = {
        basketProducts: basketProducts,
        address: selectedAddress,
        status: 'Onay Bekliyor',
        date: new Date().toLocaleDateString('tr-TR'),
        information: information
      };

      try {
        await dispatch(addOrder({ orderData })).unwrap();
        dispatch(fetchOrders());
        setOrderCreated(true);
        dispatch(clearBasket());
      } catch {
        customErrorToast("Sipariş Oluşturulamadı");
      }
    } else {
      customErrorToast("Doğrulama Kodu Hatalı");
    }
  };

  const handleConfirm = () => {
    onBack();
  };

  const setModalVisible = () => {
    navigate("/");
  }

  return (
    <div className='payment-verification-box'>
      {!orderCreated ? <>
        <div className='payment-verification-modal'>
          <p className='title'>Doğrulama kodu giriniz</p>
          <div className='payment-informations'>
            <div className='info-item'>
              <p>İşyeri Adı :</p>
              <span>Shopeny</span>
            </div>
            <div className='info-item'>
              <p>İşlem Tutarı :</p>
              <span>{formatPrice(information.totalPrice)}₺</span>
            </div>
            <div className='info-item'>
              <p>İşlem Tarihi-Saati :</p>
              <span>{dateTime}</span>
            </div>
          </div>
          <div className='verification-info'>
            <p>
              {formatPhoneNumber(user.phoneNumber)} nolu telefon numarasına SMS ile gönderilen
              SHOPENY referanslı doğrulama kodunu giriniz.
            </p>
          </div>
          <div className='verification-input-box'>
            <span>Doğrulama Kodu</span>
            <input
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder='12345'
              maxLength={5}
              type="text"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className='verification-buttons'>
            <button onClick={handleAcceptVerification}>Onayla</button>
            <button onClick={handleCancelProcess} className='cancel-verification'>İşlemi iptal et</button>
          </div>
          <RemainingTime />
        </div>
        <ConfirmationModal onConfirm={handleConfirm} />
      </>
        :
        <>
          <Modal setModalVisible={setModalVisible} >
            <div className='order-created-box'>
              <img src={successfulIcon} alt="successful" />
              <p>Siparişiniz Oluşturuldu</p>
              <span>Siparişiniz başarılı bir şekilde oluşturuldu. Siparişinizin teslimatı için gerekli bilgiler satıcıya iletilmiştir.
                Siparişinizin durumunu <Link to="/hesabim/siparislerim">Siparişlerim</Link> sayfasından takip edebilirsiniz.
              </span>
              <Link className='back-home-btn' to="/">Anasayfaya Dön</Link>
            </div>
          </Modal>
          <AnimationBackground />
        </>
      }
      {loading && <PreLoader />}
    </div>
  )
}

export default PaymentVerification