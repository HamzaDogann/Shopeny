import { useState } from 'react';
import { useSelector } from 'react-redux';

import AddressStep from "./AddressStepComponent/AddressStep.jsx"
import ConfirmationStep from "./ConfirmationStepComponent/ConfirmationStep.jsx"
import PaymentStep from "./PaymentStepComponent/PaymentStep.jsx"
import PaymentVerification from "./PaymentVerificationComponent/PaymentVerification.jsx"

const PaymentProcess = () => {
  const [currentStep, setCurrentStep] = useState(3);

  //! Payment Process Auth ile mümkün + gerekli bilgileri kullanıcı doldurduysa buraya gelebilir olacak.
  //! Eğer slice bilgisi ile dolan step varsa diğerine geçebilecek.
  //! eğer bilgiler doluysa önceki sayfaya gidebilecek.
  //! düzenleyebilecek geçmiş bilgilerini
  // const isAddressValid = useSelector((state) => state.payment.isAddressValid);
  // const isPaymentProcessed = useSelector((state) => state.payment.isPaymentProcessed);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AddressStep onNext={() => setCurrentStep(2)} />;
      case 2:
        return <PaymentStep onNext={() => setCurrentStep(3)} />

      // ) : (
      //   <div>Please complete the address step first.</div>
      // );
      case 3:
        return <ConfirmationStep onNext={() => setCurrentStep(4)} />


      case 4:
        return <PaymentVerification />;
      default:
        return null;
    }
  };

  return (
    <div className="payment-process">
      <div className="steps-navigation">
        {/* Adım Göstergesi  Özel Navigasyon */}
        <h1>Mevcut Step : {currentStep}</h1>
      </div>
      <div className="step-content">
        {renderStep()}
      </div>
    </div>
  );
};

export default PaymentProcess;
