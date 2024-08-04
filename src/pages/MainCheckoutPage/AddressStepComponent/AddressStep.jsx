import { useState } from "react";
import RadioButton from "../../../shared/helpers/RadioButton";
import Fullsize from "../../../shared/components/FullsizeOverlay/Fullsize";
import Modal from "../../../shared/components/Modal/Modal";
import AddressModal from "../../../components/AccountPageComponents/AddressModal";

//Styles
import { MdAddLocationAlt } from "react-icons/md";
import "../../AccountPage/Addresses/Addresses.scss";
import "./AddressStep.scss";

const AddressStep = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddressChange = (id) => {
    setSelectedAddress(prevSelectedAddress => prevSelectedAddress === id ? null : id);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleNewAddress = (newAddress) => {
    console.log("Yeni adres eklendi:", newAddress);
  };

  const adresVarMi = true;


  return (
    <>
      <h2>Adresinizi Seçin</h2>

      {adresVarMi

        ? <div className="choose-address-box">
          {/* Örnek Adres Kartları */}
          {['1', '2', '3'].map(id => (
            <div className="address-card" key={id}>
              <div className="address-informations">
                <p className="address-title">Ofis Adresi</p>
                <p className="address-name">Barbaroos Mah. Ata Cad. No:123 D:5, Kadıköy, İstanbul. 34670</p>
                <p className="address-recipient">Alıcı : Hamza Doğan</p>
              </div>

              <RadioButton
                name="choose-address"
                checked={selectedAddress === id}
                onChange={() => handleAddressChange(id)}
              />
            </div>
          ))}
        </div>
        :
        <div className="no-address-box">
          <p>Daha önce eklenmiş bir adres bulunmuyor, siparişe devam etmek için bir adres ekleyin.</p>
        </div>
      }


      <div className="new-address-box">
        <button onClick={() => setModalVisible(true)}>
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
    </>
  );
};

export default AddressStep;
