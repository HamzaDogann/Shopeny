import React, { useEffect, useState } from "react";
//Styles
import "./Categories.scss";
//Icons
import { GrPersonalComputer } from "react-icons/gr";

import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { PiMonitorLight } from "react-icons/pi";
import { BsMouse3 } from "react-icons/bs";
import { FaRegKeyboard } from "react-icons/fa6";
import { RxCamera } from "react-icons/rx";
import { FiMic } from "react-icons/fi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiCloseCircleFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";


const Categories = React.memo(() => {

    const [categoryMenu, setCategoryMenu] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setCategoryMenu(false);
    }, [location]);

    const hiddenPaths = [
        "hesabim",
        "sepetim",
        "favori-urunler",
        "yardim-ve-destek",
        "odeme-islemleri"
      ];
    
      const shouldHideComponent = hiddenPaths.some(path => location.pathname.includes(path));
    
      if (shouldHideComponent) {
        return null;
      }

    return (
        <>

            <div className='categories-box' style={{ display: categoryMenu && "flex" }}>
                <h3>Kategoriler</h3>
                <Link to={"/bilgisayar"} className="category-item">
                    <GrPersonalComputer />
                    <span>Bilgisayar</span>
                </Link>

                <Link to={"/telefon"} className="category-item">
                    <HiMiniDevicePhoneMobile />
                    <span>Telefon</span>
                </Link>

                <Link to={"/televizyon"} className="category-item">
                    <PiMonitorLight />
                    <span>Televizyon</span>
                </Link>

                <Link to={"/kulaklik"} className="category-item" >
                    <TfiHeadphoneAlt />
                    <span>Kulaklık</span>
                </Link>

                <Link to={"/mikrofon"} className="category-item" >
                    <FiMic />
                    <span>Mikrofon</span>
                </Link>

                <Link to={"/oyuncu-fareleri"} className="category-item" >
                    <BsMouse3 />
                    <span>Oyuncu Fareleri</span>
                </Link>

                <Link to={"/klavye"} className="category-item">
                    <FaRegKeyboard />
                    <span>Klavye</span>
                </Link>

                <Link to={"/kamera"} className="category-item">
                    <RxCamera />
                    <span>Kamera</span>
                </Link>
            </div >

            <HiOutlineMenuAlt1 onClick={() => setCategoryMenu(true)}
                style={{ display: categoryMenu && "none" }}
                className="category-mobile-menu-icon" />

            <RiCloseCircleFill
                onClick={() => setCategoryMenu(false)}
                style={{ display: categoryMenu ? "flex" : "none" }}
                className="category-menu-close-icon"
            />
        </>
    );
});


export default Categories