import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref as storageRef, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../services/firebase/config';
import { ref as dbRef, set } from 'firebase/database';
import { db } from "../../../services/firebase/config";
import { defaultProfilePhotoURL } from '../../../constants/defaultProfilePhoto';
// Varsayılan profil fotoğrafının URL'si

// Thunk for updating the user's profile photo
export const updateProfilePhoto = createAsyncThunk(
    'accountDetails/updateProfilePhoto',
    async ({ uid, file }, { rejectWithValue }) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        // Check file type and size
        if (!validTypes.includes(file.type)) {
            return rejectWithValue('Geçersiz dosya türü. JPEG, PNG ve SVG formatları desteklenmektedir.');
        }

        if (file.size > maxSize) {
            return rejectWithValue('Dosya boyutu 5MB\'yi aşmamalıdır.');
        }

        try {
            const profilePhotoRef = storageRef(storage, `users/${uid}/images/profilePhoto.png`);
            await uploadBytes(profilePhotoRef, file);

            const downloadURL = await getDownloadURL(profilePhotoRef);
            const userProfileRef = dbRef(db, `Data/Users/${uid}/profilePhotoURL`);
            await set(userProfileRef, downloadURL);

            return downloadURL;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue('Fotoğraf yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
);

// Thunk for removing the user's profile photo
export const removeProfilePhoto = createAsyncThunk(
    'accountDetails/removeProfilePhoto',
    async ({ uid }, { rejectWithValue }) => {
        try {
            // Realtime Database'de profil fotoğrafı URL'sini varsayılan URL ile güncelle
            const userProfileRef = dbRef(db, `Data/Users/${uid}/profilePhotoURL`);
            await set(userProfileRef, defaultProfilePhotoURL);

            return defaultProfilePhotoURL;
        } catch (error) {
            return rejectWithValue('Fotoğraf silinirken veya varsayılan fotoğraf URL\'si güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
);