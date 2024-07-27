import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaQuestion, FaExchangeAlt } from "react-icons/fa";
import { FaTruckRampBox } from "react-icons/fa6";
import { MdPrivacyTip } from "react-icons/md";

function Sidebar() {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectChange = (e) => {
    navigate(e.target.value);
  };

  const navLinks = [
    { path: 'sikca-sorulan-sorular', label: 'Sıkça Sorulan Sorular', icon: <FaQuestion /> },
    { path: 'iade-ve-degisim-politikasi', label: 'İade ve Değişim Politikası', icon: <FaExchangeAlt /> },
    { path: 'teslimat-bilgileri', label: 'Teslimat Bilgileri', icon: <FaTruckRampBox /> },
    { path: 'gizlilik-politikasi', label: 'Gizlilik Politikası', icon: <MdPrivacyTip /> },
  ];

  // Aktif sayfanın etiketi
  const activeLabel = navLinks.find(link => location.pathname.includes(link.path))?.label || "Sayfa Seçin";

  return (
    <div className="sidebar">
      {windowWidth >= 800 ? (
        <ul>
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              {<div className='icons'>{link.icon}</div>}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </ul>
      ) : (
        <select onChange={handleSelectChange} className="sidebar-select" defaultValue="">
          <option disabled value="">{activeLabel}</option>
          {navLinks.map((link, index) => (
            <option key={index} value={link.path}>
              {link.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default Sidebar;
