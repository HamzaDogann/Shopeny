import React, { useState } from 'react';
//!Firebase işlemleri Redux Toolkit ile implemente edilecek.
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebase/config';
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

function UploadProfilePhoto({ UserProfilePhoto }) {

    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                alert('Yalnızca JPEG, PNG ve SVG dosya türlerine izin veriliyor.');
                return;
            }

            if (file.size > maxSize) {
                alert('Dosya boyutu 5MB\'yi aşmamalıdır.');
                return;
            }

            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (selectedImage) {
            setUploading(true);
            const storageRef = ref(storage, `profile_pictures/${selectedImage.name}`);
            try {
                await uploadBytes(storageRef, selectedImage);
                const downloadURL = await getDownloadURL(storageRef);
                console.log('Dosya başarıyla yüklendi:', downloadURL);
            } catch (error) {
                console.error('Yükleme hatası:', error);
            } finally {
                setUploading(false);
            }
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setPreview(null);
    };

    const handleChooseImageClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className="upload-profile-photo">
            <h1>Profil Fotoğrafınızı Düzenleyin</h1>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />

            {preview
                ?
                <div className='profile-photo-status-box'>
                    <img className='active-profil-image' src={UserProfilePhoto} alt="" />
                    <TbArrowBigRightLinesFilled className='icon' />
                    <img src={preview} className="new-profile-image" />
                </div>
                :
                <div className='active-image-box'>
                    <img className='active-profil-image' src={UserProfilePhoto} alt="" />
                </div>
            }

            {preview
                ?
                <>
                    <div className="confirm-buttons">
                        <button className="save-button" onClick={handleUpload} disabled={uploading}>
                            {uploading ? 'Yükleniyor...' : 'Fotoğrafı Kaydet'}
                        </button>
                        <button className="reset-button" onClick={handleReset}>Sıfırla</button>
                    </div>

                    <div className="info">
                        <p>Profil fotoğrafınız, ürün yorumları ve hesap ayarlarınızda görüntülenecektir.</p>
                    </div>

                </>
                :
                <>
                    <div className='change-and-remove-photo-buttons'>
                        <button onClick={handleChooseImageClick}>Fotoğrafı Değiştir</button>
                        <button>Fotoğrafı Kaldır</button>
                    </div>

                    <div className="info">
                        <p>İzin verilen dosya türleri: JPEG, PNG, SVG</p>
                        <p>Maksimum dosya boyutu: 5MB</p>
                        <p>Profil fotoğrafınız, ürün yorumları ve hesap ayarlarınızda görüntülenecektir.</p>
                    </div>
                </>
            }
        </div>
    );
}

export default UploadProfilePhoto;
