import React, { useState } from 'react';
import "./PaymentStep.scss";
import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/lib/styles.scss";
import GoBackStepButton from '../../../features/CheckoutPagesComponents/GoBackStepButton';

function PaymentStep({ onBack }) {
  const [cardInformations, setCardInformations] = useState({
    number: '',
    expiry: '0125',
    cvc: '',
    name: '',
    focus: '',
  });
  const [expiryMonth, setExpiryMonth] = useState('01');
  const [expiryYear, setExpiryYear] = useState('25');

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
  }

  const handleInputFocus = (evt) => {
    setCardInformations((prev) => ({ ...prev, focus: evt.target.name }));
  }

  return (
    <>
      <h2 style={{marginBottom:"50px"}}>Ödeme Bilgilerinizi Girin</h2>
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
