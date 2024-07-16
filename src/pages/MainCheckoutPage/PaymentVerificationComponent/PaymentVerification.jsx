import React from 'react'
import "./PaymentVerification.scss";
function PaymentVerification() {
  return (
    <div className='payment-verification-box'>
      <div className='payment-verification-modal'>

        {/* İdarelik Düzen Daha Profesyonel yapılacak */}
        <button>X</button>
        <hr />
        Ödeme Doğrulama Telefon Doğrulaması

        <hr />
        <h4>Sifre yaz</h4>
        <input type="text" />
      </div>
    </div>
  )
}

export default PaymentVerification