import React from 'react'
import "./PaymentStep.scss";

function PaymentStep({ onBack }) {
  return (
    <div>Ödeme Bilgileri Aşaması

      <button onClick={onBack}>Geri</button>
    </div>
  )
}

export default PaymentStep