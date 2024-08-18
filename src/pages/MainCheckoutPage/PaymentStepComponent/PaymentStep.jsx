import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./PaymentStep.scss";
import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/lib/styles.scss";
import GoBackStepButton from '../../../components/CheckoutPagesComponents/GoBackStepButton';
import { setIsPaymentInfoReceived, setPaymentInformations } from '../../../store/slices/PaymentProcess/PaymentProcessSlice';

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
      setCardInformations((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (evt) => {
    setCardInformations((prev) => ({ ...prev, focus: evt.target.name }));
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

  const paymentInformations = useSelector((state) => state.paymentProcess.paymentInformations);

  const { cardInformations, expiryMonth, expiryYear, handleInputChange, handleInputFocus }
    = usePaymentForm({
      number: paymentInformations.cardNumber || '',
      expiry: paymentInformations.month + paymentInformations.year || '0125',
      cvc: paymentInformations.cvv || '',
      name: paymentInformations.nameOnCard || '',
      focus: '',
    });

  return (
    <>
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
              />
            </div>
            <div className='input-item'>
              <span>Kart Numarası</span>
              <input
                type="text"
                name="number"
                value={cardInformations.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
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
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
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
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
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
    </>
  );
}

export default PaymentStep;
