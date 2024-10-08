import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AddressStep from "./AddressStepComponent/AddressStep.jsx";
import PaymentStep from "./PaymentStepComponent/PaymentStep.jsx";
import ConfirmationStep from "./ConfirmationStepComponent/ConfirmationStep.jsx";
import PaymentVerification from "./PaymentVerificationComponent/PaymentVerification.jsx";

import CustomStepperComponent from '../../shared/components/Stepper/CustomStepper.jsx';
import BasketInformations from '../../shared/components/BasketInfo/BasketInformations.jsx';
import MiniBasketInfo from '../../shared/components/MiniBasketInfo/MiniBasketInfo.jsx';

import "./PaymentProcess.scss";

const PaymentProcess = () => {

  const navigate = useNavigate();

  //========================STATES============================

  const [currentStep, setCurrentStep] = useState(0);
  const { basketProducts } = useSelector(state => state.basket);

  //========================EFFECTS============================

  useEffect(() => {
    if (!basketProducts.length && currentStep !== 3) {
      navigate("/");
    }
  }, [basketProducts, currentStep, navigate]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (currentStep > 0) {
        setCurrentStep((prevStep) => prevStep - 1);
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentStep]);

  //========================FUNCTIONS============================

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    window.history.pushState(null, '', window.location.pathname);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    window.history.pushState(null, '', window.location.pathname);
  };

  const handleGoPayment = () => {
    handleNext();
  };

  const handleGoConfirm = () => {
    handleNext();
  };

  const handleGoVerification = () => {
    handleNext();
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentStep]);

  //========================STEPS============================

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AddressStep onNext={handleNext} />;
      case 1:
        return <PaymentStep onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <ConfirmationStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PaymentVerification onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="payment-process">
      {/* Stepper */}
      <div className='stepper-general-box'>
        <CustomStepperComponent
          activeStep={currentStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      </div>

      {/* Content */}
      <div className='content'>
        <div className='content-box'>
          {renderStep()}
        </div>

        {/* Basket Informations */}
        <div className='basket-info-box'>
          {currentStep !== 2
            ? <BasketInformations
              currentStep={currentStep}
              onGoPayment={handleGoPayment}
              onGoConfirm={handleGoConfirm}
            />
            : <MiniBasketInfo onGoVerification={handleGoVerification} handleBack={handleBack} />
          }
        </div>
      </div>
    </div>
  );
};

export default PaymentProcess;
