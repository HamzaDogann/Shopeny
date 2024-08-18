import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../../shared/components/ConfirmationModal/ConfirmationModal';
import { showModal } from '../../../store/slices/confirmationModalSlice';
import RemainingTime from '../../../components/CheckoutPagesComponents/RemainingTime';
import "./PaymentVerification.scss";
import { formatPrice } from '../../../shared/utils/formatPrice';
import { useEffect, useState } from 'react';
import { formatPhoneNumber } from '../../../shared/utils/formatPhoneNumber';
import { customErrorToast, customSuccessToast } from '../../../shared/utils/CustomToasts';
import { addOrder } from '../../../store/thunks/User/ordersThunk';
function PaymentVerification({ onBack }) {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { information, basketProducts } = useSelector(state => state.basket);
  const { addresses } = useSelector(state => state.addresses);
  const { selectedAddressId } = useSelector(state => state.paymentProcess);
  const selectedAddress = addresses.find(address => address.addressId === selectedAddressId);

  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const currentDateTime = new Date();
    const formattedDateTime = `${currentDateTime.getDate().toString().padStart(2, '0')}.${(currentDateTime.getMonth() + 1).toString().padStart(2, '0')}.${currentDateTime.getFullYear()} - ${currentDateTime.getHours().toString().padStart(2, '0')}:${currentDateTime.getMinutes().toString().padStart(2, '0')}`;
    setDateTime(formattedDateTime);
  }, []);

  //Modal Methods
  const handleCancelProcess = () => {
    dispatch(showModal({
      message: 'Ödeme işlemini iptal etmek istiyor musun?',
      confirmText: 'Evet',
      cancelText: 'Hayır',
    }));
  }

  const handleConfirm = () => {
    onBack();
  };

  //-------------------------------------------------

  const handleAcceptVerification = async () => {
    console.log("Buraya girdi");
    console.log(selectedAddress);
    const orderData = {
      basketProducts: basketProducts,
      address: selectedAddress,
      status: 'Onay Bekliyor',
      date: new Date().toLocaleDateString('tr-TR')
    };

    try {
      await dispatch(addOrder({ orderData })).unwrap();
      customSuccessToast("Sipariş Oluşturuldu")
    } catch {
      customErrorToast("Sipariş Oluşturulamadı")
    }
  };


  return (
    <div className='payment-verification-box'>
      <div className='payment-verification-modal'>
        <p className='title'>Doğrulama kodu giriniz</p>
        <div className='payment-informations'>
          <div className='info-item'>
            <p>İşyeri Adı :</p>
            <span>Shopeny</span>
          </div>
          <div className='info-item'>
            <p>İşlem Tutarı :</p>
            <span>{formatPrice(information.totalPrice)} ₺</span>
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
          <input placeholder='12345' type="text" />
        </div>
        <div className='verification-buttons'>
          <button onClick={handleAcceptVerification}>Onayla</button>
          <button onClick={handleCancelProcess} className='cancel-verification'>İşlemi iptal et</button>
        </div>
        <RemainingTime />
      </div>
      <ConfirmationModal onConfirm={handleConfirm} />
    </div>
  )
}

export default PaymentVerification