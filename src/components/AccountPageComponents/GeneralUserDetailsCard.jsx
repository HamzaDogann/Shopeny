import React, { useEffect, useState } from 'react';
import Fullsize from "../../shared/components/FullsizeOverlay/Fullsize";
import UploadProfilePhoto from './UploadProfilePhoto.jsx';
import Modal from '../../shared/components/Modal/Modal';
import { useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';
import { TbCameraPlus, TbCameraCog } from "react-icons/tb";

function GeneralUserDetailsCard() {

    //===================States===================

    const user = useSelector(state => state.auth.user);
    const [isModalVisible, setModalVisible] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 800);

    //===================Actions===================

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    useEffect(() => {
        if (user.profilePhotoURL) {
            const img = new Image();
            img.src = user.profilePhotoURL;
            img.onload = handleImageLoad;
        }
    }, [user.profilePhotoURL]);

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
                <p className='user-name'>{user.nameAndSurname}</p>
                <p className='user-email'>{user.email}</p>
                <p className='user-phone-number'>
                    {user.phoneNumber === "belirtilmedi" ? "Telefon numarası belirtilmedi" : `+0${user.phoneNumber}`}
                </p>

                {isMobileView && (
                    <button className='logout-button'>Çıkış yap</button>
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
