import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { TbPencilCog } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/features/ConfirmationModal/Modal';
import ConfirmationModal from '../../shared/components/ConfirmationModal/ConfirmationModal';
import { customErrorToast } from '../../shared/utils/CustomToasts';
import truncateName from '../../shared/utils/truncateName';

function AddressCard({ onEdit }) {

    const dispatch = useDispatch();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);


    const dummyAddress = {
        addressTitle: "İş yeri Burası Baya uzun cümle",
        city: "İstanbul",
        district: "Kadıköy",
        neighborhood: "Barbaros",
        street: "Ata Cad. No:123 D:5",
        postalCode: "34750",
        recipientName: "Hamza Doğan"
    };

    const handleDeleteAddress = () => {
        dispatch(showModal({
            message: 'Bu adresi silmek istediğinize emin misiniz?',
            confirmText: 'Evet',
            cancelText: 'Hayır',
        }));
    };

    const handleConfirm = () => {
        customErrorToast("Adres Silindi")
    };

    const handleCancel = () => {
        
    };

    const truncateLength = windowWidth < 500 ? 15 : 25;

    return (
        <div className='address-card'>
            <div className='address-informations'>
                <p className='address-title'>{truncateName(dummyAddress.addressTitle,truncateLength)}</p>
                <p className='address-name'>{dummyAddress.street}, {dummyAddress.neighborhood}, {dummyAddress.district}, {dummyAddress.city} {dummyAddress.postalCode}</p>
                <p className='address-recipient'>Alıcı: {dummyAddress.recipientName}</p>
            </div>
            <div className='manage-address-box'>
                <TbPencilCog className='icons' onClick={() => onEdit(dummyAddress)} />
                <IoClose className='icons' onClick={handleDeleteAddress} />
            </div>

            <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel} />
        </div>
    );
}

export default AddressCard;
