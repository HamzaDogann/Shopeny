import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";

import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/lib/styles.scss";

import GoBackStepButton from '../../../components/CheckoutPagesComponents/GoBackStepButton';
import { opacityEffect } from '../../../shared/animations/animations';
import { setIsPaymentInfoReceived, setPaymentInformations } from '../../../store/slices/PaymentProcess/PaymentProcessSlice';

import "./PaymentStep.scss";
function usePaymentForm(initialValues) {

  const dispatch = useDispatch();

  const [cardInformations, setCardInformations] = useState(initialValues);
  const [expiryMonth, setExpiryMonth] = useState(initialValues.expiry.slice(0, 2));
  const [expiryYear, setExpiryYear] = useState(initialValues.expiry.slice(2, 4));

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === "expiryMonth") {
      setExpiryMonth(value);
      setCardInformations(prev => ({ ...prev, expiry: value + expiryYear }));
    } else if (name === "expiryYear") {
      setExpiryYear(value);
      setCardInformations(prev => ({ ...prev, expiry: expiryMonth + value }));
    } else {
      setCardInformations(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (evt) => {
    setCardInformations(prev => ({ ...prev, focus: evt.target.name }));
  };

  useEffect(() => {
    const isFormValid = cardInformations.number.length === 16 &&
      cardInformations.cvc.length >= 3 && cardInformations.cvc.length <= 4 &&
      cardInformations.name.trim() !== '' &&
      expiryMonth.length === 2 && expiryYear.length === 2;

    if (isFormValid) {
      dispatch(setPaymentInformations({
        nameOnCard: cardInformations.name,
        cardNumber: cardInformations.number,
        month: expiryMonth,
        year: expiryYear,
        cvv: cardInformations.cvc
      }));
    } else {
      dispatch(setIsPaymentInfoReceived(false));
    }
  }, [cardInformations, expiryMonth, expiryYear, dispatch]);

  return {
    cardInformations,
    expiryMonth,
    expiryYear,
    handleInputChange,
    handleInputFocus
  };
}

function PaymentStep({ onBack }) {

  const paymentInformations = useSelector(state => state.paymentProcess.paymentInformations);
  
  const { cardInformations, expiryMonth, expiryYear, handleInputChange, handleInputFocus } = usePaymentForm({
    number: paymentInformations.cardNumber || '',
    expiry: (paymentInformations.month + paymentInformations.year) || '0125',
    cvc: paymentInformations.cvv || '',
    name: paymentInformations.nameOnCard || '',
    focus: '',
  });

  const handleCardNumberInput = (e) => {
    if (!/^\d*$/.test(e.target.value)) {
      e.preventDefault();
    } else {
      handleInputChange(e);
    }
  };

  return (
    <motion.div {...opacityEffect(0.5)}>
      <h2 style={{ marginBottom: "50px" }}>Ödeme Bilgilerinizi Girin</h2>
      <div className='payment-general-box'>
        <div className='payment-form-box'>
          <form>
            <div className='input-item'>
              <span>Kart Üzerindeki İsim</span>
              <input
                type="text"
                name="name"
                value={cardInformations.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={30}
                autoComplete="off"
                onKeyPress={(e) => {
                  if (!/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]+$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className='input-item'>
              <span>Kart Numarası</span>
              <input
                type="text"
                name="number"
                value={cardInformations.number}
                onChange={handleCardNumberInput}
                onFocus={handleInputFocus}
                maxLength={16}
                autoComplete="off"
              />
            </div>
            <div className='multi-input-items'>
              <div className='month-box'>
                <span>Ay</span>
                <select
                  name="expiryMonth"
                  value={expiryMonth}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              <div className='year-box'>
                <span>Yıl</span>
                <select
                  name="expiryYear"
                  value={expiryYear}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 25} value={String(i + 25)}>
                      {i + 25}
                    </option>
                  ))}
                </select>
              </div>
              <div className='cvc-cvv-box'>
                <span>CVC/CVV</span>
                <input
                  type="text"
                  name="cvc"
                  value={cardInformations.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength={4}
                  onKeyPress={(e) => {
                    if (!/^\d*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
          </form>
        </div>
        <div className='payment-credit-card-box'>
          <Cards
            placeholders={{ name: 'KART SAHİBİ' }}
            locale={{ valid: 'Ay/Yıl' }}
            number={cardInformations.number}
            expiry={cardInformations.expiry}
            cvc={cardInformations.cvc}
            name={cardInformations.name}
            focused={cardInformations.focus}
          />
        </div>
      </div>
      <GoBackStepButton onBack={onBack} />
    </motion.div>
  );
}

export default PaymentStep;
