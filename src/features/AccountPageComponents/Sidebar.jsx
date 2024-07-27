import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaAddressCard } from "react-icons/fa";
import { FaBox } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/features/auth/authActions';


function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

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
        { path: 'hesap-bilgilerim', label: 'Hesap Bilgilerim', icon: <FaAddressCard /> },
        { path: 'siparislerim', label: 'Siparişlerim', icon: <FaBox /> },
        { path: 'adreslerim', label: 'Adreslerim', icon: <FaLocationDot /> },
        { path: 'kargo-takip', label: 'Kargo Takip', icon: <FaTruck /> },
    ];

    // Aktif sayfanın etiketi
    const activeLabel = navLinks.find(link => location.pathname.includes(link.path))?.label || "Sayfa Seçin";


    const handleLogout = () => {
        dispatch(authActions.logout())
            .then(() => {
                navigate('/');
            });
    };

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
                    <button onClick={()=> handleLogout()} className='logout-btn'>
                        {<div className='icons'><FaDoorOpen/></div>}
                        <span>Çıkış Yap</span>
                    </button>
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
