import React from 'react'
import "./Auth.scss";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import ShopenyLogo from "../../assets/logo/ShopenyLogo.png";
function ResetPassword() {
  return (
    <>
      <div className='reset-password-box'>
        {/* Logo */}
        <div className='shopeny-logo' style={{marginTop:"-40px", marginBottom:"15px", marginRight:"15px"}}>
          <img src={ShopenyLogo} alt="ShopenyLogo" />
        </div>
        <div className='reset-password-modal'>
          <div className='back-box'>
            <IoArrowBack className='come-back-to-signIn-page' />
          </div>
          <div className='reset-password-content'>
            <h2>Şifre Yenileme</h2>
            <h3 className='linear-colors-h3'></h3>
            <p>Şifre yenileme bağlantısını gönderebilmemiz için e-posta adresinize ihtiyacımız var.</p>
            <form className='reset-password-form'>
              <div className='flex-row align-center' style={{ marginTop: "15px" }}>
                <HiOutlineMail className='auth-icons' />
                <input type="text" placeholder="E-posta Adresi" />
              </div>
              <button>Gönder</button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default ResetPassword