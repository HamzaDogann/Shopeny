import React, { useState } from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import ShopenyLogo from "../../assets/logo/ShopenyLogo.png";
import "./Auth.scss";
import { customSuccessToast, customErrorToast } from "../../shared/utils/CustomToasts.js";
function SignIn() {

  const [showPassword, setShowPassword] = useState(false);


  const handleToaster = (e) => {
    e.preventDefault();
    customSuccessToast("Giriş Başarılı");
    customErrorToast("Hata var!");
  }

  return (
    <div className='sign-box'>

      {/* Logo */}
      <div className='shopeny-logo'>
        <img src={ShopenyLogo} alt="ShopenyLogo" />
      </div>

      {/* Sign-In Modal */}
      <div className='sign-modal'>
        <h2>Giriş Yap</h2>
        <h3 className='linear-colors-h3'></h3>

        {/* =========================Form========================= */}

        <form onSubmit={handleToaster} className='sign-form'>
          {/* Email */}
          <div className='input-box'>
            <HiOutlineMail className='auth-icons' />
            <input type="text" placeholder="E-mail giriniz" />
          </div>
          {/* Password */}
          <div className='input-box' style={{ marginTop: "5px" }}>
            <RiLockPasswordLine className='auth-icons' />
            <input type={showPassword ? "text" : "password"} maxLength={16} placeholder="Şifre giriniz" />
            {showPassword
              ? <LuEye onClick={() => setShowPassword(false)} className='auth-icons eyes' />
              : <LuEyeOff onClick={() => setShowPassword(true)} className='auth-icons eyes' />
            }
          </div>

          <div className='forgot-password-box'>
            <a className='forgot-password-link' href="">Şifremi Unuttum</a>
          </div>

          <div className='flex-center'>
            <button className='sign-buttons' type="submit">Giriş Yap</button>
          </div>

          {/* Social Media Buttons */}
          <div className='social-media-auth-box' >
            <span>Sosyal Hesabın ile Giriş Yap</span>
            <div className='social-platforms'>
              <button>
                <FcGoogle />
              </button>
              <button>
                <FaFacebook style={{ color: "#1877F2" }} />
              </button>
            </div>
          </div>

        </form>

        <div className='account-status-box'>
          <p>Hesabınız yok mu? <a href="#">Üye Ol</a></p>
        </div>
      </div >
    </div >
  )
}

export default SignIn
