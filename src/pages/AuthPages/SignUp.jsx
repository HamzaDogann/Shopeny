import React, { useState } from 'react'
import RadioButton from '../../features/Helpers/RadioButton';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import "./Auth.scss";
import MembershipAgreement from '../../features/AuthPageComponents/MembershipAgreement';
import { authActions } from '../../store/features/auth/authActions';
import { useDispatch } from 'react-redux';

function SignUp() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    agreementAccepted: false,
    promotionalAccepted: false
  });

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [showAgreement, setShowAgreement] = useState(false);

  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
  };

  const handleAgreement = () => {
    setShowAgreement(!showAgreement);
  }

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(authActions.registerWithEmail("hamzadgn011@gmail.com", "hamza123", "Hamza", "Doğan", "Erkek", "05253535353"));

  }

  return (

    <>
      <div className='sign-box' style={{ marginBottom: "70px" }}>
        {/* Background Theme */}
        <div className='background-theme'></div>

        {/* Sign-Up Modal */}
        <div className='sign-modal sign-up-box'>
          <h2>Üye Ol</h2>
          <h3 className='linear-colors-h3'></h3>

          {/* =========================Form========================= */}

          <form onSubmit={handleRegister} className='sign-form'>
            <div className='input-box'>
              <input type="text" placeholder="Ad Soyad" />
            </div>
            <span className='warning-spans'></span>

            {/* Email */}
            <div className='input-box'>
              <input type="text" placeholder="E-mail" />
            </div>
            <span className='warning-spans'></span>

            {/* Password */}
            <div className='input-box'>
              <input type={showPassword ? "text" : "password"} maxLength={16} placeholder="Şifre Belirle" />
              {showPassword
                ? <LuEye onClick={() => setShowPassword(false)} className='auth-icons eyes' />
                : <LuEyeOff onClick={() => setShowPassword(true)} className='auth-icons eyes' />
              }
            </div>
            <span className='warning-spans'></span>


            {/* Phone Number */}
            <div className='input-box'>
              <span style={{ fontSize: "15px" }}>+90</span>
              <input style={{ marginLeft: "-10px" }} type="text" maxLength={10} placeholder="Telefon" />
            </div>
            <span className='warning-spans'></span>

            {/* Gender */}
            <div className='input-box'>
              <select value="Cinsiyetiniz" name="" id="">
                <option value="" disabled selected>Cinsiyetiniz</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
              </select>
            </div>

            {/* Confirm Rules  */}
            <div className='confirm-rules-box'>
              <RadioButton onChange={handleCheckboxChange} />
              <span>
                <strong onClick={() => handleAgreement()} style={{ cursor: "pointer", marginRight: "4px" }}>
                  Üyelik Sözleşmesi
                </strong>
                şartlarını okudum ve kabul ediyorum.
              </span>
            </div>
            <div className='confirm-rules-box' style={{ marginTop: "20px" }}>
              <RadioButton onChange={handleCheckboxChange} />
              <span>Shopeny'nin bana özel sunduğu kampanya ve fırsatlardan haberdar olmak istiyorum.</span>
            </div>
            <span className='warning-spans'></span>

            {/* ======================================================== */}

            {/*Sign Up */}
            <div className='flex-center' style={{ marginTop: "10px" }}>
              <button className='sign-buttons' type="submit">Üye Ol</button>
            </div>

            <div className='account-status-box' style={{ marginTop: "20px" }}>
              <p>Zaten Hesabın var mı? <a href="#">Giriş Yap</a></p>
            </div>

          </form>
        </div>
      </div>

      {showAgreement && <MembershipAgreement handleAgreement={handleAgreement} />}

    </>

  )
}

export default SignUp