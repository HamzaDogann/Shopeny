import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../services/firebase/config';
import { ref as dbRef, get, ref, set, update } from 'firebase/database';
import { db } from "../../../services/firebase/config";
import { defaultProfilePhotoURL } from '../../../constants/defaultProfilePhoto';


//==================Profile Photo Process =================

export const updateProfilePhoto = createAsyncThunk(
    'accountDetails/updateProfilePhoto',
    async ({ uid, file }, { rejectWithValue }) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        const maxSize = 5 * 1024 * 1024; // 5MB

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
            return rejectWithValue('Fotoğraf yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
);

export const removeProfilePhoto = createAsyncThunk(
    'accountDetails/removeProfilePhoto',
    async ({ uid }, { rejectWithValue }) => {
        try {
            const userProfileRef = dbRef(db, `Data/Users/${uid}/profilePhotoURL`);
            await set(userProfileRef, defaultProfilePhotoURL);

            return defaultProfilePhotoURL;
        } catch (error) {
            return rejectWithValue('Fotoğraf silinirken veya varsayılan fotoğraf URL\'si güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
);

//==================Profile Details Process =================

export const updateProfileDetails = createAsyncThunk(
    'accountDetails/updateProfileDetails',
    async ({ uid, updatedInformations }, { rejectWithValue }) => {
        try {
            const userRef = ref(db, `Data/Users/${uid}`);

            const snapshot = await get(userRef);
            if (!snapshot.exists()) {
                throw new Error('Kullanıcı bulunamadı.');
            }

            const currentData = snapshot.val();

            const updatedData = {
                ...currentData,
                ...updatedInformations,
            };

            await update(userRef, updatedData);

            return updatedData;
        } catch (error) {
            return rejectWithValue('Profil bilgilerini güncellemek için bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
);