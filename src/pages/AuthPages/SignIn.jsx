import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '../../schemas/SignInSchema.js';
import { authActions } from '../../store/slices/Auth/authActions.js';
import { Link, useNavigate } from 'react-router-dom';
import AnimationBackground from '../../shared/components/AnimationBackground/AnimationBackground.jsx';
import { motion } from 'framer-motion';
import ShopenyLogo from "../../assets/logo/ShopenyLogo.png";
import "./Auth.scss";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { opacityAndTransformEffect } from '../../shared/animations/animations.js';
import { PiShieldWarningBold } from "react-icons/pi";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const handleLoginWithGoogle = () => {
    dispatch(authActions.loginWithGoogle());
  };

  const handleLoginWithFacebook = () => {
    dispatch(authActions.loginWithFacebook());
  };

  const handleSignIn = async (data) => {
    await dispatch(authActions.loginWithEmail(data.email, data.password));
  };

  return (
    <div className='sign-box'>
      <motion.div {...opacityAndTransformEffect('y', 20, 0.5)} className='shopeny-logo'>
        <img src={ShopenyLogo} alt="ShopenyLogo" />
      </motion.div>

      <motion.div {...opacityAndTransformEffect('y', 20, 0.5)} className='sign-modal'>
        <h2>Giriş Yap</h2>
        <h3 className='linear-colors-h3'></h3>

        <form onSubmit={handleSubmit(handleSignIn)} className='sign-form'>
          {/* Email */}
          <div className={`input-box ${errors.email ? 'error' : ''}`}>
            <HiOutlineMail className='auth-icons' />
            <input
              type="text"
              placeholder="E-mail giriniz"
              {...register('email')}
            />
          </div>
          {errors.email &&
            <p className="error-message">
              <PiShieldWarningBold className='error-icons' />
              {errors.email.message}
            </p>
          }
          {/* Password */}
          <div className={`input-box ${errors.password ? 'error' : ''}`} style={{ marginTop: "5px" }}>
            <RiLockPasswordLine className='auth-icons' />
            <input
              type={showPassword ? "text" : "password"}
              maxLength={16}
              placeholder="Şifre giriniz"
              {...register('password')}
            />
            {showPassword
              ? <LuEye onClick={() => setShowPassword(false)} className='auth-icons eyes' />
              : <LuEyeOff onClick={() => setShowPassword(true)} className='auth-icons eyes' />
            }
          </div>
          {errors.password && <p className="error-message">
            <PiShieldWarningBold className="error-icons" />
            {errors.password.message}
          </p>}

          <div className='forgot-password-box'>
            <Link to="/sifre-yenileme" className='forgot-password-link'>Şifremi unuttum</Link>
          </div>

          <div className='flex-center'>
            <button type="submit" className='sign-buttons'>Giriş Yap</button>
          </div>
        </form>

        {/* Social Media Buttons */}
        <div className='social-media-auth-box'>
          <span>Sosyal Hesabın ile Giriş Yap</span>
          <div className='social-platforms'>
            <button onClick={handleLoginWithGoogle}>
              <FcGoogle />
            </button>
            <button onClick={handleLoginWithFacebook}>
              <FaFacebook style={{ color: "#1877F2" }} />
            </button>
          </div>
        </div>

        <div className='account-status-box'>
          <p>Hesabınız yok mu? <Link to="/uye-ol">Üye Ol</Link></p>
        </div>
      </motion.div>
      <div></div>
      <AnimationBackground />
    </div>
  );
}

export default SignIn;
