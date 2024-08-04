import NoCargo from "../../../assets/images/CargoTracking/NoCargo.png"
import NoContent from '../../../components/AccountPageComponents/NoContent';
function CargoTracking() {
  return (
    <NoContent image={NoCargo} description="Kargoda bir siparişiniz bulunmuyor" buttonText="Siparişlere Gözat" path="/hesabim/siparislerim" />
  )
}

export default CargoTracking