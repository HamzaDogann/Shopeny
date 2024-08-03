import React, { useEffect, useState } from "react";
// Styles
import "./Categories.scss";
// Icons
import { GrPersonalComputer } from "react-icons/gr";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { PiMonitorLight } from "react-icons/pi";
import { BsMouse3 } from "react-icons/bs";
import { FaRegKeyboard } from "react-icons/fa6";
import { RxCamera } from "react-icons/rx";
import { FiMic } from "react-icons/fi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";

import { RiCloseCircleFill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

const Categories = React.memo(() => {

    const [categoryMenu, setCategoryMenu] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 800);

    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 800);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setCategoryMenu(false);
    }, [location]);

    const hiddenPaths = [
        "hesabim",
        "sepetim",
        "favori-urunler",
        "yardim-ve-destek",
        "odeme-islemleri",
    ];

    const shouldHideComponent =
        location.pathname.includes("odeme-islemleri") ||
        (!isMobileView && hiddenPaths.some((path) => location.pathname.includes(path)));

    if (shouldHideComponent) {
        return null;
    }

    const categories = [
        { path: "/bilgisayar", icon: <GrPersonalComputer className="icon" />, label: "Bilgisayar" },
        { path: "/telefon", icon: <HiMiniDevicePhoneMobile className="icon" />, label: "Telefon" },
        { path: "/televizyon", icon: <PiMonitorLight className="icon" />, label: "Televizyon" },
        { path: "/kulaklik", icon: <TfiHeadphoneAlt className="icon" />, label: "Kulaklık" },
        { path: "/mikrofon", icon: <FiMic className="icon" />, label: "Mikrofon" },
        { path: "/oyuncu-fareleri", icon: <BsMouse3 className="icon" />, label: "Oyuncu Fareleri" },
        { path: "/klavye", icon: <FaRegKeyboard className="icon" />, label: "Klavye" },
        { path: "/kamera", icon: <RxCamera className="icon" />, label: "Kamera" }
    ];

    return (
        <>
            <div className="categories-box" style={{ display: categoryMenu && "flex" }}>
                <h3>Kategoriler</h3>
                {categories.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.path}
                        className={({ isActive }) => isActive ? 'category-item active-link' : 'category-item'}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </div>

            <HiMenu
                onClick={() => setCategoryMenu(true)}
                style={{ display: categoryMenu && "none" }}
                className="category-mobile-menu-icon"
            />

            {isMobileView ? (
                <RiCloseCircleFill
                    onClick={() => setCategoryMenu(false)}
                    style={{ display: categoryMenu ? "flex" : "none" }}
                    className="category-menu-close-icon"
                />
            ) : null}
        </>
    );
});

export default Categories;