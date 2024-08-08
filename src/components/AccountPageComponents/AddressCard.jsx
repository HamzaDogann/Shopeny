import React from 'react';
import { IoClose } from "react-icons/io5";
import { TbPencilCog } from "react-icons/tb";
import truncateName from '../../shared/utils/truncateName';

function AddressCard({ onEdit, onDelete, address }) {
  const windowWidth = window.innerWidth;
  const truncateLength = windowWidth < 500 ? 15 : 25;

  return (
    <div className='address-card'>
      <div className='address-informations'>
        <p className='address-title'>{truncateName(address.addressTitle, truncateLength)}</p>
        <p className='address-name'>{address.street}, {address.neighborhood}, {address.district}, {address.city} {address.postalCode}</p>
        <p className='address-recipient'>Alıcı: {address.recipientName}</p>
      </div>
      <div className='manage-address-box'>
        <TbPencilCog className='icons' onClick={() => onEdit(address)} />
        <IoClose className='icons' onClick={() => onDelete(address)} />
      </div>
    </div>
  );
}

export default AddressCard;
