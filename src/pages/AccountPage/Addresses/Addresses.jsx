import React, { useState } from 'react';
import AddressCard from '../../../features/AccountPageComponents/AddressCard';
import { TbHomeDot } from "react-icons/tb";
import NoAddress from "../../../assets/images/Orders/NoAddress.png";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import NoContent from '../../../features/AccountPageComponents/NoContent';
import Fullsize from '../../../shared/components/FullsizeOverlay/Fullsize';
import AddressModal from '../../../features/AccountPageComponents/AddressModal';
import Modal from '../../../shared/components/Modal/Modal';
import "./Addresses.scss";

function Addresses() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const adresVarMi = true;

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

  const handleNewAddress = (newAddress) => {
    // Yeni adres ekleme işlemleri
    console.log("Yeni adres eklendi:", newAddress);
  }

  const handleUpdateAddress = (updatedAddress) => {
    // Adres güncelleme işlemleri
    console.log("Adres güncellendi:", updatedAddress);
  }

  return (
    <div className='addresses-box'>
      {adresVarMi ? (
        <>
          <h2>
            <TbHomeDot className='home-icon' />
            <span>Adreslerim</span>
          </h2>

          <div className='addresses'>
            <AddressCard onEdit={handleEditAddress} />
            <AddressCard onEdit={handleEditAddress} />
            <AddressCard onEdit={handleEditAddress} />

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
          path="/hesabim/siparislerim"
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
    </div >
  );
}

export default Addresses;