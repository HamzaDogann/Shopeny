import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MembershipAgreement from '../../components/AuthPageComponents/MembershipAgreement';
import { authActions } from '../../store/slices/Auth/authActions';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import RadioButton from '../../shared/helpers/RadioButton';
import AnimationBackground from '../../shared/components/AnimationBackground/AnimationBackground';
import "./Auth.scss";
function SignUp() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    agreementAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  const handleAgreement = () => {
    setShowAgreement(!showAgreement);
  }

  //=======Input Data Controllers Methods======\\

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRadioButtonChange = () => {
    setFormData((prevFormData) => {
      const newAgreementAccepted = !prevFormData.agreementAccepted;
      return { ...prevFormData, agreementAccepted: newAgreementAccepted };
    });
  };


  //=======Register Method======\\

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(authActions.registerWithEmail(formData, () => {
      setTimeout(() => {
        navigate('/giris-yap');
      }, 2000);
    }));
  };

  return (
    <>
      <div className='sign-box' style={{ marginBottom: "70px" }}>
        {/* Sign-Up Modal */}
        <div className='sign-modal sign-up-box'>
          <h2>Üye Ol</h2>
          <h3 className='linear-colors-h3'></h3>

          {/* =========================Form========================= */}

          <form onSubmit={handleRegister} className='sign-form'>
            <div className='input-box'>
              <input
                type="text"
                name="name"
                placeholder="Ad Soyad"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <span className='warning-spans'></span>

            {/* Email */}
            <div className='input-box'>
              <input
                type="text"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <span className='warning-spans'></span>

            {/* Password */}
            <div className='input-box'>
              <input
                type={showPassword ? "text" : "password"}
                maxLength={16}
                name="password"
                placeholder="Şifre Belirle"
                value={formData.password}
                onChange={handleInputChange}
              />

              {showPassword
                ? <LuEye onClick={() => setShowPassword(false)} className='auth-icons eyes' />
                : <LuEyeOff onClick={() => setShowPassword(true)} className='auth-icons eyes' />
              }
            </div>
            <span className='warning-spans'></span>


            {/* Phone Number */}
            <div className='input-box'>
              <span style={{ fontSize: "15px" }}>+90</span>
              <input
                style={{ marginLeft: "-10px" }}
                type="text"
                name="phone"
                maxLength={10}
                placeholder="Telefon"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <span className='warning-spans'></span>

            {/* Gender */}
            <div className='input-box'>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="" disabled>Cinsiyetiniz</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
              </select>
            </div>

            {/* Confirm Rules  */}
            <div className='confirm-rules-box'>

              <div onClick={() => handleRadioButtonChange()}>
                <RadioButton />
              </div>

              <span>
                <strong onClick={() => handleAgreement()} style={{ cursor: "pointer", marginRight: "4px" }}>
                  Üyelik Sözleşmesi
                </strong>
                şartlarını okudum ve kabul ediyorum.
              </span>
            </div>
            <div className='confirm-rules-box' style={{ marginTop: "20px" }}>
              <RadioButton />
              <span>Shopeny'nin bana özel sunduğu kampanya ve fırsatlardan haberdar olmak istiyorum.</span>
            </div>
            <span className='warning-spans'></span>

            {/* ======================================================== */}

            {/*Sign Up */}
            <div className='flex-center' style={{ marginTop: "10px" }}>
              <button className='sign-buttons' type="submit">Üye Ol</button>
            </div>

            <div className='account-status-box' style={{ marginTop: "20px" }}>
              <p>Zaten Hesabın var mı? <Link to="/giris-yap">Giriş Yap</Link></p>
            </div>

          </form>
        </div>
      </div>

      {showAgreement && <MembershipAgreement handleAgreement={handleAgreement} />}
      <AnimationBackground />
    </>

  )
}

export default SignUp