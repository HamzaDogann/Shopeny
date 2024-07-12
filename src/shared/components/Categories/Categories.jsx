import React, { useState } from "react";
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



const Categories = React.memo(() => {
  
    const [categoryMenu, setCategoryMenu] = useState(false);
 
    return (
        <>

            <div className='categories-box' style={{ display: categoryMenu && "flex" }}>
                <h3>Kategoriler</h3>
                <button className="category-item">
                    <GrPersonalComputer />
                    <span>Bilgisayar</span>
                </button>

                <button className="category-item">
                    <HiMiniDevicePhoneMobile />
                    <span>Telefon</span>
                </button>

                <button className="category-item">
                    <PiMonitorLight />
                    <span>Televizyon</span>
                </button>

                <button className="category-item">
                    <TfiHeadphoneAlt />
                    <span>Kulaklık</span>
                </button>

                <button className="category-item">
                    <FiMic />
                    <span>Mikrofon</span>
                </button>

                <button className="category-item">
                    <BsMouse3 />
                    <span>Oyuncu Fareleri</span>
                </button>

                <button className="category-item">
                    <FaRegKeyboard />
                    <span>Klavye</span>
                </button>

                <button className="category-item">
                    <RxCamera />
                    <span>Kamera</span>
                </button>
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