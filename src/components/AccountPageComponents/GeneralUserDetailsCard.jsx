import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';
import { TbCameraPlus, TbCameraCog } from "react-icons/tb";
import { setUser } from '../../store/slices/Auth/authSlice.js';

import Fullsize from "../../shared/components/FullsizeOverlay/Fullsize";
import UploadProfilePhoto from './UploadProfilePhoto.jsx';
import Modal from '../../shared/components/Modal/Modal';
import truncateName from '../../shared/utils/truncateName.js';
import { authActions } from '../../store/slices/Auth/authActions.js';
import { useNavigate } from 'react-router-dom';

function GeneralUserDetailsCard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //===================STATES===================

    const user = useSelector(state => state.auth.user);
    const [isModalVisible, setModalVisible] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 800);
    const { updatedProfileDetails } = useSelector(state => state.accountDetails);

    //===================ACTIONS===================

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleLogout = () => {
        dispatch(authActions.logout())
            .then(() => {
                navigate('/');
            });
    };

    //===================EFFECTS===================

    useEffect(() => {
        if (user.profilePhotoURL) {
            const img = new Image();
            img.src = user.profilePhotoURL;
            img.onload = handleImageLoad;
        }
    }, [user.profilePhotoURL]);


    useEffect(() => {
        if (updatedProfileDetails) {
            const currentUser = user;
            const updatedUser = {
                ...currentUser,
                nameAndSurname: updatedProfileDetails.nameAndSurname || currentUser.nameAndSurname,
                phoneNumber: updatedProfileDetails.phoneNumber || currentUser.phoneNumber,
                gender: updatedProfileDetails.gender || currentUser.gender,
                email: updatedProfileDetails.email || currentUser.email
            };

            dispatch(setUser(updatedUser));
        }
    }, [dispatch, updatedProfileDetails]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 800);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //===================JSX===================

    return (
        <div className='general-user-details-box'>
            <div className='image-container'>
                {!imageLoaded ?
                    <Skeleton
                        variant="circular"
                        width={120}
                        height={120}
                        sx={{ bgcolor: 'grey.300' }}
                    />
                    :
                    <div className='profile-photo-box'>
                        <img
                            src={user.profilePhotoURL}
                            alt="Profile"
                            style={{ display: imageLoaded ? 'block' : 'none' }}
                            onLoad={handleImageLoad}
                            className='profile-image'
                        />
                        <TbCameraCog className='edit-icon' />
                        <div onClick={() => setModalVisible(true)} className='overlay'>
                            <TbCameraPlus className='icon' />
                        </div>
                    </div>
                }
            </div>
            <div className='user-infos'>
                <p className='user-name'>{truncateName(user.nameAndSurname, 25)}</p>
                <p className='user-email'>{user.email}</p>
                <p className='user-phone-number'>
                    {user.phoneNumber === "belirtilmedi" ? "Telefon numarası belirtilmedi" : `+0${user.phoneNumber}`}
                </p>

                {isMobileView && (
                    <button onClick={handleLogout} className='logout-button'>Çıkış yap</button>
                )}
            </div>

            <Fullsize isVisible={isModalVisible}>
                <Modal setModalVisible={setModalVisible}>
                    <UploadProfilePhoto UserProfilePhoto={user.profilePhotoURL} setModalVisible={setModalVisible} />
                </Modal>
            </Fullsize>
        </div>
    )
}

export default GeneralUserDetailsCard;
