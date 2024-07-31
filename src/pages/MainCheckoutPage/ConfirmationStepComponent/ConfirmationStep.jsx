import React from 'react'
import "./ConfirmationStep.scss";
function ConfirmationStep({onBack}) {
  return (
    <div>Onay aşaması

      <button onClick={onBack}>Geri</button>
    </div>
  )
}

export default ConfirmationStep