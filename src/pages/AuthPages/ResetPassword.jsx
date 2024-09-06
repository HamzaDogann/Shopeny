import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import ShopenyLogo from "../../assets/logo/ShopenyLogo.png";
import { motion } from 'framer-motion';

import "./Auth.scss";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/slices/Auth/authActions';
import { Link, useNavigate } from 'react-router-dom';
import AnimationBackground from '../../shared/components/AnimationBackground/AnimationBackground';
import { opacityAndTransformEffect } from '../../shared/animations/animations';

function ResetPassword() {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
        await dispatch(authActions.resetPassword(email));
        navigate("/giris-yap"); 
    } catch (error) {

    }
};

  return (
    <>
      <div className='reset-password-box'>
        {/* Logo */}
        <motion.div {...opacityAndTransformEffect('y', 18, 0.4)} className='shopeny-logo' style={{ marginTop: "-40px", marginBottom: "15px", marginRight: "15px" }}>
          <img src={ShopenyLogo} alt="ShopenyLogo" />
        </motion.div>

        <motion.div {...opacityAndTransformEffect('y', 18, 0.4)} className='reset-password-modal'>
          <Link to="/giris-yap" className='come-back-to-signIn-page'>
            <IoArrowBack />
          </Link>

          <div className='reset-password-content'>
            <h2>Şifre Yenileme</h2>
            <h3 className='linear-colors-h3'></h3>
            <p>Şifre yenileme bağlantısını gönderebilmemiz için e-posta adresinize ihtiyacımız var.</p>

            <form onSubmit={handleResetPassword} className='reset-password-form'>
              <div className='flex-row align-center' style={{ marginTop: "15px" }}>
                <HiOutlineMail className='auth-icons' />
                <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="E-posta Adresi" />
              </div>
              <button type='submit'>Gönder</button>
            </form>
          </div>
        </motion.div>

        <AnimationBackground />
      </div>

    </>
  )
}

export default ResetPassword