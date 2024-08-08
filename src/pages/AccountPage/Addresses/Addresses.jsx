import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { TbHomeDot } from "react-icons/tb";

import { addUserAddress, updateUserAddress, getUserAddresses, removeUserAddress } from "../../../store/thunks/User/addressesThunk";
import { customErrorToast, customSuccessToast } from '../../../shared/utils/CustomToasts';
import { createContainerVariants, createItemVariants, opacityAndTransformEffect } from "../../../shared/animations/animations";

import AddressCard from '../../../components/AccountPageComponents/AddressCard';
import NoAddress from "../../../assets/images/Orders/NoAddress.png";
import NoContent from '../../../components/AccountPageComponents/NoContent';
import Fullsize from '../../../shared/components/FullsizeOverlay/Fullsize';
import Modal from '../../../shared/components/Modal/Modal';
import AddressModal from '../../../components/AccountPageComponents/AddressModal';
import ConfirmationModal from '../../../shared/components/ConfirmationModal/ConfirmationModal';
import { hideModal, showModal } from '../../../store/slices/confirmationModalSlice';

import "./Addresses.scss";


function Addresses() {

  const dispatch = useDispatch();
  const addresses = useSelector(state => state.addresses.addresses);
  const isLoading = useSelector(state => state.addresses.loading);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);

  //--------Get All Addresses--------

  useEffect(() => {
    if (!addresses || addresses.length === 0) {
      dispatch(getUserAddresses());
    }
  }, [dispatch, addresses]);

  //--------Modal Handlers--------

  const handleAddingProcess = () => {
    if (addresses.length >= 3) {
      customErrorToast("Daha fazla adres ekleyemezsin");
      return;
    }
    setEditMode(false);
    setSelectedAddress(null);
    setModalVisible(true);
  };

  const handleEditingProcess = (address) => {
    setEditMode(true);
    setSelectedAddress(address);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditMode(false);
    setSelectedAddress(null);
  };

  const handleDeleteAddress = (address) => {
    dispatch(showModal({
      message: "Bu adresi silmek istediğinize emin misiniz?",
      confirmText: "Evet",
      cancelText: "Hayır"
    }));
    setAddressToDelete(address);
  };


  //--------Functionality--------

  //!ADD
  const handleNewAddress = async (newAddress) => {
    try {
      await dispatch(addUserAddress(newAddress)).unwrap();
      customSuccessToast("Adres Eklendi", 2000);
    } catch {
      customErrorToast("Adres Eklenemedi");
    }
  };

  //!UPDATE
  const handleUpdateAddress = async (updatedAddress) => {
    try {
      await dispatch(updateUserAddress(updatedAddress)).unwrap();
      customSuccessToast("Adres Güncellendi", 2000);
    } catch (error) {
      customErrorToast("Güncelleme Başarısız");
      customErrorToast(error.message);
    }
  };

  //!DELETE
  const handleConfirmDelete = async () => {
    try {
      await dispatch(removeUserAddress(addressToDelete.addressId)).unwrap();
      customSuccessToast("Adres başarıyla silindi.", 2000);
    } catch (error) {
      customErrorToast("Adres silinirken bir hata oluştu.");
    } finally {
      dispatch(hideModal());
    }
  };
  //DELETE CANCEL
  const handleCancelDelete = () => {
    dispatch(hideModal());
  };

  return (
    <motion.div className='addresses-box'
      {...opacityAndTransformEffect('y', 20, 0.5)}>
      {isLoading ? (
        null
      ) : (
        <motion.div
          variants={createContainerVariants}
          initial="hidden"
          animate="visible"
          className="addresses-container"
        >
          {addresses.length > 0 ? (
            <>
              <motion.h2 {...opacityAndTransformEffect('y', 20, 0.4)}>
                <TbHomeDot className='home-icon' />
                <span>Adreslerim</span>
              </motion.h2>

              <motion.div className='addresses' variants={createContainerVariants(0.6, 0.3)} initial="hidden" animate="visible">
                {addresses.map((address, index) => (
                  <motion.div className='address-item' key={index} variants={createItemVariants(20, 0)}>
                    <AddressCard
                      address={address}
                      onEdit={handleEditingProcess}
                      onDelete={handleDeleteAddress}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <div className='add-address-box'>
                <button className='add-new-address' onClick={handleAddingProcess}>
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
              func={handleAddingProcess}
              icon={<MdOutlineAddLocationAlt className='icon' />}
            />
          )}
        </motion.div>
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

      <ConfirmationModal
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </motion.div>
  );
}

export default Addresses;
