import React from 'react'
import { Link } from "react-router-dom";
import NoCargo from "../../../assets/images/CargoTracking/NoCargo.png"
import "./CargoTracking.scss";
function CargoTracking() {
  return (
    <div className='cargo-tracking-box'>
      <div className='cargo-box'>
        <div className='no-cargo-image-box'>
          <img src={NoCargo} alt="" />
        </div>
        <p>Kargoda bulunan bir siparişiniz yok</p>
        <Link to='/hesabim/siparislerim'>
          Siparişlere Gözat
        </Link>
      </div>
    </div>
  )
}

export default CargoTracking