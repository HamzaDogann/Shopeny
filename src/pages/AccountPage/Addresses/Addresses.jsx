import React from 'react'
import Address from '../../../features/AccountPageComponents/Address'
import { TbHomeDot } from "react-icons/tb";
import "./Addresses.scss";
import { MdOutlineAddLocationAlt } from "react-icons/md";

function Addresses() {
  return (
    <div className='addresses-box'>
      <h2>
        <TbHomeDot className='home-icon' />
        <span>Adreslerim</span>
      </h2>

      <div className='addresses'>
        <Address />
        <Address />
        <Address />
      </div>

      <button className='add-new-address'>
        <MdOutlineAddLocationAlt className='icon' />
        <span>Adres Ekle</span>
      </button>
    </div>
  )
}

export default Addresses