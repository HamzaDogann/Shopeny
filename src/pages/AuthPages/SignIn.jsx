import React, { useState } from 'react'

//Styles - Images - Icons
import ShopenyLogo from "../../assets/logo/ShopenyLogo.png";
import "./Auth.scss";

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

//Configurations
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/features/auth/authActions.js';
import { Link, useNavigate } from 'react-router-dom';


function SignIn() {

  const user = useSelector(state => state.auth.user);

  // Sign In Informations
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Password Show/Hidden
  const [showPassword, setShowPassword] = useState(false);

  //Login Methods

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginWithGoogle = () => {
    dispatch(authActions.loginWithGoogle());
  }

  const handleLoginWithFacebook = () => {
    dispatch(authActions.loginWithFacebook());
  }


  const handleSignIn = async (e) => {
    e.preventDefault();
    await dispatch(authActions.loginWithEmail(email, password));
  };

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

        <form onSubmit={handleSignIn} className='sign-form'>
          {/* Email */}
          <div className='input-box'>
            <HiOutlineMail className='auth-icons' />
            <input onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="E-mail giriniz" />
          </div>

          {/* Password */}
          <div className='input-box' style={{ marginTop: "5px" }}>
            <RiLockPasswordLine className='auth-icons' />
            <input onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              maxLength={16}
              placeholder="Şifre giriniz"
            />
            {showPassword
              ? <LuEye onClick={() => setShowPassword(false)} className='auth-icons eyes' />
              : <LuEyeOff onClick={() => setShowPassword(true)} className='auth-icons eyes' />
            }
          </div>

          <div className='forgot-password-box'>

            <Link to="/sifre-yenileme" className='forgot-password-link'>Şifremi unuttum</Link>
          </div>

          <div className='flex-center'>
            <button type="submit" className='sign-buttons'>Giriş Yap</button>
          </div>

        </form>

        {/* Social Media Buttons */}
        <div className='social-media-auth-box' >
          <span>Sosyal Hesabın ile Giriş Yap</span>
          <div className='social-platforms'>
            <button onClick={() => handleLoginWithGoogle()}>
              <FcGoogle />
            </button>
            <button>
              <FaFacebook onClick={() => handleLoginWithFacebook()} style={{ color: "#1877F2" }} />
            </button>
          </div>
        </div>

        <div className='account-status-box'>
          <p>Hesabınız yok mu?  <Link to="/uye-ol">Üye Ol</Link></p>
        </div>
      </div >
      <div>
      </div>
    </div >
  )
}

export default SignIn
