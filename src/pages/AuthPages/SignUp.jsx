import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SignUpSchema from '../../schemas/SignUpSchema';

import { PiShieldWarningBold } from 'react-icons/pi';
import { LuEye, LuEyeOff } from "react-icons/lu";

import { authActions } from '../../store/slices/Auth/authActions';
import RadioButton from '../../shared/helpers/RadioButton';
import AnimationBackground from '../../shared/components/AnimationBackground/AnimationBackground';
import { opacityAndTransformEffect } from '../../shared/animations/animations';
import MembershipAgreement from '../../components/AuthPageComponents/MembershipAgreement';

import './Auth.scss';

function SignUp() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const handleAgreement = () => {
    setShowAgreement(!showAgreement);
  }

  const onSubmit = (data) => {
    setFormSubmitted(true);
    if (agreementAccepted) {
      dispatch(authActions.registerWithEmail(data, () => {
        setTimeout(() => {
          navigate('/giris-yap');
        }, 2000);
      }));
    }
  };

  return (
    <>
      <motion.div {...opacityAndTransformEffect('y', 18, 0.4)} className='sign-box' style={{ marginBottom: "70px" }}>
        <div className='sign-modal sign-up-box'>
          <h2>Üye Ol</h2>
          <h3 className='linear-colors-h3'></h3>

          <form onSubmit={handleSubmit(onSubmit)} className='sign-form'>
            {/* Name */}
            <div className='input-box'>
              <input
                type="text"
                placeholder="Ad Soyad"
                className={errors.name ? 'warning-error' : ''}
                {...register('name')}
              />
            </div>
            {errors.name &&
              <span className='warning-spans'>
                <PiShieldWarningBold className='error-icons' />
                {errors.name.message}
              </span>}

            {/* Email */}
            <div className='input-box'>
              <input
                type="text"
                placeholder="E-mail"
                className={errors.email ? 'warning-error' : ''}
                {...register('email')}
              />
            </div>
            {errors.email &&
              <span className='warning-spans'>
                <PiShieldWarningBold className='error-icons' />
                {errors.email.message}
              </span>}

            {/* Password */}
            <div className='input-box'>
              <input
                type={showPassword ? "text" : "password"}
                maxLength={16}
                placeholder="Şifre Belirle"
                className={errors.password ? 'warning-error' : ''}
                {...register('password')}
              />
              {showPassword
                ? <LuEye onClick={() => setShowPassword(false)} className='auth-icons eyes' />
                : <LuEyeOff onClick={() => setShowPassword(true)} className='auth-icons eyes' />
              }
            </div>
            {errors.password && <span className='warning-spans'>
              <PiShieldWarningBold className='error-icons' />
              {errors.password.message}</span>}

            {/* Phone Number */}
            <div className='input-box'>
              <span style={{ fontSize: "15px" }}>+90</span>
              <input
                style={{ marginLeft: "-10px" }}
                type="text"
                placeholder="Telefon"
                maxLength={10}
                className={errors.phone ? 'warning-error' : ''}
                {...register('phone')}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > 0 && value[0] === '0') {
                    e.target.value = value.slice(1);
                  }
                }}
              />
            </div>
            {errors.phone && <span className='warning-spans'>
              <PiShieldWarningBold className='error-icons' />
              {errors.phone.message}</span>}

            {/* Gender */}
            <div className='input-box'>
              <select
                className={errors.gender ? 'warning-error' : ''}
                {...register('gender')}
              >
                <option value="" disabled>Cinsiyetiniz</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
              </select>
            </div>
            {errors.gender &&
              <span className='warning-spans'>
                <PiShieldWarningBold className='error-icons' />
                {errors.gender.message}
              </span>}

            {/* Confirm Rules */}
            <div className='confirm-rules-box'>
              <div>
                <RadioButton
                  checked={agreementAccepted}
                  onChange={() => setAgreementAccepted(!agreementAccepted)}
                />
              </div>
              <span>
                <strong onClick={handleAgreement} style={{ cursor: "pointer", marginRight: "4px" }}>
                  Üyelik Sözleşmesi
                </strong>
                şartlarını okudum ve kabul ediyorum.
              </span>
            </div>
            {formSubmitted && !agreementAccepted && <span className='warning-spans' style={{ marginTop: '5px' }}>Üyelik sözleşmesini kabul etmelisiniz.</span>}

            <div className='confirm-rules-box' style={{ marginTop: "10px" }}>
              <RadioButton />
              <span>Shopeny'nin bana özel sunduğu kampanya ve fırsatlardan haberdar olmak istiyorum.</span>
            </div>

            {/*Sign Up */}
            <div className='flex-center' style={{ marginTop: "20px" }}>
              <button className='sign-buttons' type="submit">Üye Ol</button>
            </div>

            <div className='account-status-box' style={{ marginTop: "20px" }}>
              <p>Zaten Hesabın var mı? <Link to="/giris-yap">Giriş Yap</Link></p>
            </div>
          </form>
        </div>
      </motion.div>

      {showAgreement && <MembershipAgreement handleAgreement={handleAgreement} />}
      <AnimationBackground />
    </>
  );
}

export default SignUp;
