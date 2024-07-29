import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GeneralUserDetailsCard from '../../../features/AccountPageComponents/GeneralUserDetailsCard';
import { TbPencilCog } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

// Styles
import "./AccountDetails.scss";
import truncateName from '../../../shared/utils/truncateName';
import truncateEmail from '../../../shared/utils/truncateEmail';

function AccountDetails() {
    const user = useSelector(state => state.auth.user);

    const initialFormState = {
        nameAndSurname: user.nameAndSurname,
        gender: user.gender,
        email: user.email,
        phoneNumber: user.phoneNumber
    };

    const [formState, setFormState] = useState(initialFormState);
    const [editing, setEditing] = useState({
        nameAndSurname: false,
        phoneNumber: false
    });
    const [isFormChanged, setIsFormChanged] = useState(false);

    const inputRefs = {
        nameAndSurname: useRef(null),
        phoneNumber: useRef(null)
    };

    useEffect(() => {
        if (editing.nameAndSurname && inputRefs.nameAndSurname.current) {
            inputRefs.nameAndSurname.current.focus();
        }
        if (editing.phoneNumber && inputRefs.phoneNumber.current) {
            inputRefs.phoneNumber.current.focus();
        }
    }, [editing]);

    useEffect(() => {
        setIsFormChanged(JSON.stringify(initialFormState) !== JSON.stringify(formState));
    }, [formState]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            gender: value
        }));
    };

    const handleEditClick = (field) => {
        setEditing(prevState => ({
            ...prevState,
            [field]: true
        }));
    };

    const handleSaveClick = (field) => {
        setEditing(prevState => ({
            ...prevState,
            [field]: false
        }));
    };

    const handleCancel = () => {
        setFormState(initialFormState);
        setEditing({
            nameAndSurname: false,
            phoneNumber: false
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(formState);
    };

    const isEditing = Object.values(editing).some(value => value);

    return (
        <div className='account-details-box'>
            <h2>Hesap Bilgilerim</h2>
            <GeneralUserDetailsCard />
            
            <div className='change-user-infos-box'>
                <form className='form-box' onSubmit={handleSubmitForm}>
                    <div className='row'>
                        <div className='input-box'>
                            <p>Ad Soyad</p>
                            <div className='input-flex'>
                                {editing.nameAndSurname ? (
                                    <>
                                        <input
                                            type="text"
                                            name="nameAndSurname"
                                            value={formState.nameAndSurname}
                                            onChange={handleInputChange}
                                            ref={inputRefs.nameAndSurname}
                                            className='name-and-surname-input'
                                        />
                                        <FaCircleCheck
                                            className='check-icon'
                                            onClick={() => handleSaveClick('nameAndSurname')}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <span>{truncateName(formState.nameAndSurname, 16)}</span>
                                        <TbPencilCog
                                            className='edit-icon'
                                            onClick={() => handleEditClick('nameAndSurname')}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='input-box'>
                            <p>Email</p>
                            <div className='input-flex'>
                                <span className='email-span'>{truncateEmail(formState.email, 12)}</span>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='input-box'>
                            <p>Telefon Numarası</p>
                            <div className='input-flex'>
                                {editing.phoneNumber ? (
                                    <>
                                        <p>+90</p>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            maxLength={10}
                                            value={formState.phoneNumber}
                                            onChange={handleInputChange}
                                            ref={inputRefs.phoneNumber}
                                            className='number-input'
                                        />
                                        <FaCircleCheck
                                            className='check-icon'
                                            onClick={() => handleSaveClick('phoneNumber')}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {formState.phoneNumber !== "belirtilmedi" ? <p>+90</p>
                                            :
                                            <FaPhoneAlt className='phone-icon' />
                                        }

                                        <span className='number-span'>{truncateName(formState.phoneNumber, 16)}</span>
                                        <TbPencilCog
                                            className='edit-icon'
                                            onClick={() => handleEditClick('phoneNumber')}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='input-box'>
                            <p>Cinsiyet</p>
                            <div className='input-flex'>
                                <select
                                    name="gender"
                                    value={formState.gender}
                                    onChange={handleSelectChange}
                                >
                                    <option value="Belirtilmedi">Belirtilmedi</option>
                                    <option value="Erkek">Erkek</option>
                                    <option value="Kadın">Kadın</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='form-actions'>
                        <button type="submit" className={`submit-btn ${isFormChanged && !isEditing ? 'enabled' : 'disabled'}`} disabled={!isFormChanged || isEditing}>Kaydet</button>
                        <button type="button" className={`cancel-btn ${isFormChanged ? 'enabled' : 'disabled'}`} onClick={handleCancel} disabled={!isFormChanged}>İptal</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AccountDetails;
