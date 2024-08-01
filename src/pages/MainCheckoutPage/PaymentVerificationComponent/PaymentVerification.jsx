import { useDispatch } from 'react-redux';
import ConfirmationModal from '../../../shared/components/ConfirmationModal/ConfirmationModal';
import { showModal } from '../../../store/features/ConfirmationModal/Modal';
import RemainingTime from '../../../features/CheckoutPagesComponents/RemainingTime';
import "./PaymentVerification.scss";
function PaymentVerification({ onBack }) {
  
  const dispatch = useDispatch();

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

  //Ödeme İşlemini Onayladıktan Sonra yapılacak işlemler.
  const handleAcceptVerification = () => {
 
  };

  
  console.log("Verification Component Rendered");
  return (
    <div className='payment-verification-box'>
      <div className='payment-verification-modal'>
        <p className='title'>Doğrulama kodu giriniz</p>
        <div className='payment-informations'>
          <div className='info-item'>
            <p>İş yeri Adı :</p>
            <span>Shopeny</span>
          </div>
          <div className='info-item'>
            <p>İşlem Tutarı :</p>
            <span>11.000.000 ₺</span>
          </div>
          <div className='info-item'>
            <p>İşlem Tarihi-Saati :</p>
            <span>21.08.2024 - 18:20 </span>
          </div>
        </div>
        <div className='verification-info'>
          <p>05XX XXX XX 90 nolu telefon numarasına SMS ile gönderilen
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