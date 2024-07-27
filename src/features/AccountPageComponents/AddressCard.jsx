import React from 'react';
import { IoClose } from "react-icons/io5";
import { TbPencilCog } from "react-icons/tb";

function AddressCard({ onEdit }) {
    const dummyAddress = {
        addressTitle: "İş yeri",
        city: "İstanbul",
        district: "Kadıköy",
        neighborhood: "Barbaros",
        street: "Ata Cad. No:123 D:5",
        postalCode: "34750",
        recipientName: "Hamza Doğan"
    };

    return (
        <div className='address-card'>
            <div className='address-informations'>
                <p className='address-title'>{dummyAddress.addressTitle}</p>
                <p className='address-name'>{dummyAddress.street}, {dummyAddress.neighborhood}, {dummyAddress.district}, {dummyAddress.city} {dummyAddress.postalCode}</p>
                <p className='address-recipient'>Alıcı: {dummyAddress.recipientName}</p>
            </div>
            <div className='manage-address-box'>
                <TbPencilCog className='icons' onClick={() => onEdit(dummyAddress)} />
                <IoClose className='icons' />
            </div>
        </div>
    )
}

export default AddressCard;