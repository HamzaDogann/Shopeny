import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../../store/utils/getUserId';
import { setUser } from '../../store/slices/Auth/authSlice';
import { removeProfilePhoto, updateProfilePhoto } from '../../store/thunks/User/accountDetailsThunk';
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { customErrorToast, customSuccessToast } from '../../shared/utils/CustomToasts';
import { defaultProfilePhotoURL } from '../../constants/defaultProfilePhoto';
import PreLoader from "../PreLoader/PreLoader"

function UploadProfilePhoto({ UserProfilePhoto, setModalVisible }) {

    const dispatch = useDispatch();
    const userId = getUserId();

    //=========================STATES=========================

    const { loading, error, updatedProfilePhoto } = useSelector((state) => state.accountDetails);
    const { user } = useSelector((state) => state.auth);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [preview, setPreview] = useState(null);

    //=====================IMAGE ACTIONS=========================

    //handle Updated Profile Photo
    useEffect(() => {
        if (updatedProfilePhoto) {
            dispatch(setUser({ ...user, profilePhotoURL: updatedProfilePhoto }));
        }
    }, [updatedProfilePhoto])


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file) {
            if (!validTypes.includes(file.type)) {
                setErrorMsg("İzin verilen dosya türleri: JPEG, PNG, SVG")
                return;
            }
            if (file.size > maxSize) {
                setErrorMsg('Dosya boyutu 5MB aşmamalıdır');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setErrorMsg(null);
            setSelectedImage(file);
        }
    };


    const handleReset = () => {
        setSelectedImage(null);
        setPreview(null);
    };

    const handleChooseImageClick = () => {
        document.getElementById('fileInput').click();
    };


    //=========================DATABASE ACTIONS=========================

    //Add & Update Profile Photo
    const handleUpload = async () => {
        if (selectedImage) {
            try {
                await dispatch(updateProfilePhoto({ uid: userId, file: selectedImage }));
                customSuccessToast("Profil Fotoğrafı Güncellendi");
                setModalVisible(false);
                setPreview(null);
            }
            catch {
                customErrorToast("Profil Fotoğrafı Güncellenemedi");
            }
        }

    };

    //Remove Profile Photo
    const handleRemoveProfilePhoto = async () => {
        try {
            await dispatch(removeProfilePhoto({ uid: userId }));
            customSuccessToast("Profil Fotoğrafı Kaldırıldı");
            setModalVisible(false);
            setPreview(null);
        } catch (error) {
            customErrorToast("Fotoğraf Kaldırılamadı");
        }
    }

    //=========================JSX=========================

    return (
        <div className="upload-profile-photo">
            {loading && <PreLoader />}
            <h1>Profil Fotoğrafınızı Düzenleyin</h1>
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} />

            {preview ? (
                <div className='profile-photo-status-box'>
                    <img className='active-profil-image' src={UserProfilePhoto} alt="" />
                    <TbArrowBigRightLinesFilled className='icon' />
                    <img src={preview} className="new-profile-image" alt="Preview" />
                </div>
            ) : (
                <div className='active-image-box'>
                    <img className='active-profil-image' src={UserProfilePhoto} alt="" />
                </div>
            )}

            {preview ? (
                <>
                    <div className="confirm-buttons">
                        <button className="save-button" onClick={handleUpload} disabled={loading}>
                            {loading ? 'Kaydediliyor...' : 'Fotoğrafı Kaydet'}
                        </button>
                        <button className="reset-button" onClick={handleReset}>Sıfırla</button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="info">
                        <p>Profil fotoğrafınız, ürün yorumları ve hesap ayarlarınızda görüntülenecektir.</p>
                    </div>
                </>
            ) : (
                <>
                    <div className='change-and-remove-photo-buttons'>
                        {user.profilePhotoURL == defaultProfilePhotoURL
                            ?
                            <button onClick={handleChooseImageClick}>Fotoğraf Ekle</button>
                            :
                            <>
                                <button onClick={handleChooseImageClick}>Fotoğrafı Değiştir</button>
                                <button onClick={handleRemoveProfilePhoto}>Fotoğrafı Kaldır</button>
                            </>
                        }
                    </div>

                    <span className='error-message'>{errorMsg}</span>

                    <div className="info">
                        <p>İzin verilen dosya türleri: JPEG, PNG, SVG</p>
                        <p>Maksimum dosya boyutu: 5MB</p>
                        <p>Profil fotoğrafınız, ürün yorumları ve hesap ayarlarınızda görüntülenecektir.</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default UploadProfilePhoto;
