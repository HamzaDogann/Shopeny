import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from '../../../components/AccountPageComponents/AddressCard';
import { TbHomeDot } from "react-icons/tb";
import NoAddress from "../../../assets/images/Orders/NoAddress.png";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import NoContent from '../../../components/AccountPageComponents/NoContent';
import Fullsize from '../../../shared/components/FullsizeOverlay/Fullsize';
import AddressModal from '../../../components/AccountPageComponents/AddressModal';
import Modal from '../../../shared/components/Modal/Modal';

import { addUserAddress, updateUserAddress, removeUserAddress, getUserAddresses } from "../../../store/thunks/User/addressesThunk";
import "./Addresses.scss";
import { customErrorToast, customSuccessToast } from '../../../shared/utils/CustomToasts';
import { getUserId } from '../../../store/utils/getUserId';

function Addresses() {

  const dispatch = useDispatch();
  const addresses = useSelector(state => state.addresses.addresses);
  const userId = getUserId(); // Kullanıcının ID'sini almak
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(getUserAddresses({ userId }));
    }
  }, [userId, dispatch]);


  const handleAddAddress = () => {
    setEditMode(false);
    setSelectedAddress(null);
    setModalVisible(true);
  }

  const handleEditAddress = (address) => {
    setEditMode(true);
    setSelectedAddress(address);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditMode(false);
    setSelectedAddress(null);
  }

  const handleNewAddress = async (newAddress) => {
    try {
      const result = await dispatch(addUserAddress(newAddress)).unwrap();
      customSuccessToast("Adres Eklendi");

    } catch (error) {
      customErrorToast(error.message);
    }
  }

  const handleUpdateAddress = (updatedAddress) => {
    // Adres güncelleme işlemleri
    console.log("Adres güncellendi:", updatedAddress);
  }


  return (
    <div className='addresses-box'>
      {Array.isArray(addresses) && addresses.length > 0 ? (
        <>
          <h2>
            <TbHomeDot className='home-icon' />
            <span>Adreslerim</span>
          </h2>

          <div className='addresses'>
            {addresses.map((address, index) => (
              <AddressCard key={index} address={address} onEdit={handleEditAddress} />
            ))}
          </div>

          <div className='add-address-box'>
            <button className='add-new-address' onClick={handleAddAddress}>
              <MdOutlineAddLocationAlt className='icon' />
              <span>Adres Ekle</span>
            </button>
          </div>
        </>
      ) : (
        <NoContent
          image={NoAddress}
          description="Adres bilgileriniz bulunmuyor"
          buttonText="Adres Ekleyin"
          path=""
          func={handleAddAddress}
          icon={<MdOutlineAddLocationAlt className='icon' />}
        />
      )}

      <Fullsize isVisible={isModalVisible}>
        <Modal setModalVisible={setModalVisible}>
          <AddressModal
            isVisible={isModalVisible}
            isEditMode={isEditMode}
            onClose={handleCloseModal}
            initialAddress={selectedAddress}
            onSubmit={isEditMode ? handleUpdateAddress : handleNewAddress}
          />
        </Modal>
      </Fullsize>
    </div>
  );
}

export default Addresses;