import { useEffect, useState } from "react";
import RadioButton from "../../../shared/helpers/RadioButton";
import Fullsize from "../../../shared/components/FullsizeOverlay/Fullsize";
import Modal from "../../../shared/components/Modal/Modal";
import AddressModal from "../../../components/AccountPageComponents/AddressModal";

//Styles
import { MdAddLocationAlt } from "react-icons/md";
import "../../AccountPage/Addresses/Addresses.scss";
import "./AddressStep.scss";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress, getUserAddresses } from "../../../store/thunks/User/addressesThunk";
import truncateName from "../../../shared/utils/truncateName";
import { customErrorToast, customSuccessToast } from "../../../shared/utils/CustomToasts";
import { setIsAddress } from "../../../store/slices/PaymentProcess/PaymentProcessSlice";
import { opacityEffect } from "../../../shared/animations/animations";
import { motion } from "framer-motion"

const AddressStep = () => {
  const { addresses } = useSelector(state => state.addresses);
  const { selectedAddressId } = useSelector(state => state.paymentProcess)
  const [selectedAddress, setSelectedAddress] = useState(selectedAddressId);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const windowWidth = window.innerWidth;
  const truncateLength = windowWidth < 500 ? 15 : 25;
  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch])

  const handleAddressChange = (id) => {
    setSelectedAddress((prevSelectedAddress) => {
      const newAddress = prevSelectedAddress === id ? null : id;
      return newAddress;
    });
  };

  useEffect(() => {
    dispatch(setIsAddress(selectedAddress));
  }, [selectedAddress, dispatch]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAddProcess = () => {
    if (addresses.length >= 4) {
      customErrorToast("Daha fazla adres ekleyemezsin", 16, 2400);
      return;
    }
    setModalVisible(true);
  };

  const handleNewAddress = async (newAddress) => {
    try {
      await dispatch(addUserAddress(newAddress)).unwrap();
      customSuccessToast("Adres Eklendi", 2000);
    } catch {
      customErrorToast("Adres Eklenemedi", 16, 2400);
    }
  };


  return (
    <>
      <motion.div {...opacityEffect(0.5)}>
        <h2>Adresinizi Seçin</h2>

        {addresses.length > 0

          ? <div className="choose-address-box">
            {/* Örnek Adres Kartları */}
            {addresses.map(address => (
              <motion.div  {...opacityEffect(0.7)} className="address-card" key={address.addressId}>
                <div className="address-informations">
                  <p className='address-title'>{truncateName(address.addressTitle, truncateLength)}</p>
                  <p className='address-name'>{address.street}, {address.neighborhood}, {address.district}, {address.city}, {address.postalCode}</p>
                  <p className='address-recipient'>Alıcı: {address.recipientName}</p>
                </div>

                <RadioButton
                  name="choose-address"
                  checked={selectedAddress === address.addressId}
                  onChange={() => handleAddressChange(address.addressId)}
                />
              </motion.div>
            ))}
          </div>
          :
          <div className="no-address-box">
            <p>Daha önce eklenmiş bir adres bulunmuyor, siparişe devam etmek için bir adres ekleyin.</p>
          </div>
        }


        <div className="new-address-box">
          <button onClick={() => handleAddProcess()}>
            <span>Adres Ekle</span>
            <MdAddLocationAlt className="icon" />
          </button>
        </div>

        {/* Modal */}
        <Fullsize isVisible={isModalVisible}>
          <Modal setModalVisible={setModalVisible}>
            <AddressModal
              isVisible={isModalVisible}
              onClose={handleCloseModal}
              onSubmit={handleNewAddress}
            />
          </Modal>
        </Fullsize>
      </motion.div>
    </>
  );
};

export default AddressStep;
