import { Navigate, Route, Routes } from 'react-router-dom';
import AccountDetails from '../pages/AccountPage/AccountDetails/AccountDetails.jsx';
import Addresses from '../pages/AccountPage/Addresses/Addresses.jsx';
import CargoTracking from '../pages/AccountPage/CargoTracking/CargoTracking.jsx';
import Order from '../pages/AccountPage/Orders/Order.jsx';
import Account from '../pages/AccountPage/Account.jsx';

const AccountRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Account />} >
        <Route index element={<Navigate to="hesap-bilgilerim" />} />
        <Route path="hesap-bilgilerim" element={<AccountDetails />} />
        <Route path="adreslerim" element={<Addresses />} />
        <Route path="kargo-takip" element={<CargoTracking />} />
        <Route path="siparislerim" element={<Order />} />
        <Route path="*" element={<Navigate to="hesap-bilgilerim" />} />
      </Route>
    </Routes>

  );
};
export default AccountRoutes;