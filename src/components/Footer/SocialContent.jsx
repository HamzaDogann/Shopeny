import React from 'react'
import { FaPhoneVolume } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

//Social
import AppStore from "../../assets/images/Footer/Social/app-store.webp";
import HuaweiAppGalery from "../../assets/images/Footer/Social/huawei-appgallery.webp";
import PlayStore from "../../assets/images/Footer/Social/play-store.webp";

function SocialContent() {
  return (
    <div className='social-content-box'>

      <div className='social-item'>
        <span>Müşteri Hattı:</span>
        <div className='flex-center'>
          <FaPhoneVolume />
          <p>0340 34 34 340</p>
        </div>
      </div>

      <div className='social-item'>
        <span>Sosyal Medya:</span>
        <div className='social-medias-box'>
          <RiTwitterXFill className='social-icon' />
          <FaFacebookF className='social-icon' />
          <FaYoutube className='social-icon' />
          <FaInstagram className='social-icon' />
        </div>
      </div>

      <div className='social-item'>
        <span>İndirmek İçin:</span>
        <div className='social-platforms'>
         <img src={PlayStore} alt="PlayStore" />
         <img src={AppStore} alt="AppStore" />
         <img src={HuaweiAppGalery} alt="HuaweiAppGalery" />
        </div>
      </div>

    </div>
  )
}

export default SocialContent