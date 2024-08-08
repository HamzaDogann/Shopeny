import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { TbPencilCog } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/slices/confirmationModalSlice';
import ConfirmationModal from '../../shared/components/ConfirmationModal/ConfirmationModal';
import { customErrorToast, customSuccessToast } from '../../shared/utils/CustomToasts';
import truncateName from '../../shared/utils/truncateName';
import { removeUserAddress } from '../../store/thunks/User/addressesThunk';

function AddressCard({ onEdit, address }) {

    const dispatch = useDispatch();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const addressId = address.addressId;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleDeleteAddress = async (addressId) => {
        try {
            await dispatch(removeUserAddress(addressId)).unwrap();
            customSuccessToast("Adres başarıyla silindi.",2000);
        } catch (error) {
            customErrorToast("Adres silinirken bir hata oluştu.");
        }

        // dispatch(showModal({
        //     message: 'Bu adresi silmek istediğinize emin misiniz?',
        //     confirmText: 'Evet',
        //     cancelText: 'Hayır',
        // }));
    };

    //DELETE ADDRESS
    const handleConfirm = async () => {


    };
    const handleCancel = () => {

    };

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
                <IoClose className='icons' onClick={() => handleDeleteAddress(address.addressId)} />
            </div>
            <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel} />
        </div>
    )
}

export default AddressCard;
