import { Navigate, Route, Routes } from "react-router-dom";
import FAQ from "../pages/HelpAndSupportPage/FAQ/FAQ.jsx";
import PrivacyPolicy from "../pages/HelpAndSupportPage/PrivacyPolicy/PrivacyPolicy.jsx";
import DeliveryInformation from "../pages/HelpAndSupportPage/DeliveryInformation/DeliveryInformation.jsx";
import ReturnAndExchangePolicy from "../pages/HelpAndSupportPage/ReturnAndExchangePolicy/ReturnAndExchangePolicy.jsx";
import HelpAndSupport from "../pages/HelpAndSupportPage/HelpAndSupport.jsx";

function HelpAndSupportRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HelpAndSupport />}>
        <Route index element={<Navigate to="sikca-sorulan-sorular" />} />
        <Route path="sikca-sorulan-sorular" element={<FAQ />} />
        <Route path="gizlilik-politikasi" element={<PrivacyPolicy />} />
        <Route path="teslimat-bilgileri" element={<DeliveryInformation />} />
        <Route path="iade-ve-degisim-politikasi" element={<ReturnAndExchangePolicy />} />
        <Route path="*" element={<Navigate to="sikca-sorulan-sorular" />} />
      </Route>
    </Routes>
  );
}

export default HelpAndSupportRoutes;
