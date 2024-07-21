import { useEffect } from "react";
import {Navigate, Route, Routes } from "react-router-dom";
import FAQ from "../pages/HelpAndSupportPage/FAQ/FAQ.jsx";
import PrivacyPolicy from "../pages/HelpAndSupportPage/PrivacyPolicy/PrivacyPolicy.jsx";
import DeliveryInformation from "../pages/HelpAndSupportPage/DeliveryInformation/DeliveryInformation.jsx";
import ReturnAndExchangePolicy from "../pages/HelpAndSupportPage/ReturnAndExchangePolicy/ReturnAndExchangePolicy.jsx";

function HelpAndSupportRoutes() {

  return (
    <Routes>
      <Route path="/" element={<FAQ />} />
      <Route path="sikca-sorulan-sorular" element={<FAQ />} />
      <Route path="gizlilik-politikasi" element={<PrivacyPolicy />} />
      <Route path="teslimat-bilgileri" element={<DeliveryInformation />} />
      <Route path="iade-ve-degisim-politikasi" element={<ReturnAndExchangePolicy />} />
      <Route path="*" element={<Navigate to="/yardim-ve-destek" />} />
    </Routes>
  );
}

export default HelpAndSupportRoutes;