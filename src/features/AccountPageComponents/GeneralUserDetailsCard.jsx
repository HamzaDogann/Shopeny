import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';
import { TbCameraPlus } from "react-icons/tb";
import { TbCameraCog } from "react-icons/tb";
import Fullsize from "../../shared/components/FullsizeOverlay/Fullsize";
import UploadPPModal from './UploadProfilePhoto.jsx';
import Modal from '../../shared/components/Modal/Modal';
import UploadProfilePhoto from './UploadProfilePhoto.jsx';

function GeneralUserDetailsCard() {

    const user = useSelector(state => state.auth.user);
    const [isModalVisible, setModalVisible] = useState(false);

    const [imageLoaded, setImageLoaded] = useState(false);

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

    const UserProfilePhoto = user.profilePhotoURL;

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
            </div>

            <Fullsize isVisible={isModalVisible}>
                <Modal setModalVisible={setModalVisible}>
                    <UploadProfilePhoto UserProfilePhoto={UserProfilePhoto} />
                </Modal>
            </Fullsize>
        </div>
    )
}

export default GeneralUserDetailsCard