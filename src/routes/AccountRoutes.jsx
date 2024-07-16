import { Navigate, Route, Routes } from 'react-router-dom';
import AccountDetails from '../pages/AccountPage/AccountDetails/AccountDetails.jsx';
import Addresses from '../pages/AccountPage/Addresses/Addresses.jsx';
import CargoTracking from '../pages/AccountPage/CargoTracking/CargoTracking.jsx';
import Order from '../pages/AccountPage/Orders/Order.jsx';


const AccountRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountDetails />} />
      <Route path="*" element={<Navigate to="/hesabim" />} />
      <Route path="hesap-bilgilerim" element={<AccountDetails />} />
      <Route path="adreslerim" element={<Addresses />} />
      <Route path="kargo-takip" element={<CargoTracking />} />
      <Route path="siparislerim" element={<Order />} />
    </Routes>
  );
};
export default AccountRoutes;