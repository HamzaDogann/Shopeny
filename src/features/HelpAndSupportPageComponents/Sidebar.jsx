import { NavLink } from "react-router-dom";
import { FaTruckRampBox } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <NavLink
          to="sikca-sorulan-sorular"
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          <FaQuestion className="icons" />
          <span>Sıkça Sorulan Sorular</span>
        </NavLink>

        <NavLink
          to="iade-ve-degisim-politikasi"
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          <FaExchangeAlt className="icons" />
          <span>İade ve Değişim Politikası</span>
        </NavLink>

        <NavLink
          to="teslimat-bilgileri"
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          <FaTruckRampBox className="icons" />
          <span>Teslimat Bilgileri</span>
        </NavLink>

        <NavLink
          to="gizlilik-politikasi"
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          <MdPrivacyTip className="icons" />
          <span>Gizlilik Politikası</span>
        </NavLink>
      </ul>
    </div>
  );
}


export default Sidebar;
