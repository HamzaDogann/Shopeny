import React from 'react'
import { IoClose } from "react-icons/io5";
import { TbPencilCog } from "react-icons/tb";


function Address() {
    return (
        <div className='address-card'>
            <div className='address-informations'>
                <p className='address-title'>Adres Başlığı</p>
                <p className='address-name'>Barbaros Mah., Ata Cad. No:123 D:5, Kadıköy, İstanbul 34750</p>
                <p className='address-recipient'>Alıcı : Hamza Doğan </p>
            </div>
            <div className='manage-address-box'>
                <TbPencilCog className='icons' />
                <IoClose className='icons' />
            </div>

        </div>
    )
}

export default Address