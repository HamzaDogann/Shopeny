import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ShopenyLogo from '../../assets/logo/ShopenyLogo.png';

import { IoArrowBack } from 'react-icons/io5';
import { HiOutlineMail } from 'react-icons/hi';
import { PiShieldWarningBold } from 'react-icons/pi';

import { authActions } from '../../store/slices/Auth/authActions';
import { opacityAndTransformEffect } from '../../shared/animations/animations';
import AnimationBackground from '../../shared/components/AnimationBackground/AnimationBackground';

import './Auth.scss';

const schema = z.object({
  email: z.string()
    .min(1, 'Bir E-posta giriniz') 
    .email('Geçersiz E-posta adresi') 
});

function ResetPassword() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const handleResetPassword = async (data) => {
    try {
      await dispatch(authActions.resetPassword(data.email));
      navigate('/giris-yap');
    } catch { }
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

            <form onSubmit={handleSubmit(handleResetPassword)} className='reset-password-form'>
              <div className='flex-row align-center' style={{ marginTop: "15px" }}>
                <HiOutlineMail className='auth-icons' />
                <input
                  type="email"
                  placeholder="E-posta giriniz"
                  {...register('email')}
                />
              </div>
              {errors.email && <p className='email-error'>
                <PiShieldWarningBold className='error-icons' />
                {errors.email.message}
              </p>}
              <button type='submit'>Gönder</button>
            </form>
          </div>
        </motion.div>

        <AnimationBackground />
      </div>
    </>
  );
}

export default ResetPassword;
