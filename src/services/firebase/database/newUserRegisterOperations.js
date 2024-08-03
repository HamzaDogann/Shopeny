import { ref as dbRef, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../services/firebase/config';
import userDefaultProfilePhoto from "../../../assets/images/User/userDefaultProfilePhoto.png"
import { customErrorToast} from '../../../shared/utils/CustomToasts';



//=================== Add new user to database | Email & Password Registration ===================

export const newUserRegistration = async (uid, formData) => {
    const { email, name, gender, phone } = formData;

    const userData = {
        email: email,
        nameAndSurname: name,
        phoneNumber: phone,
        gender: gender,
        profilePhotoURL: '',
    };

    const userRef = dbRef(db, `Data/Users/${uid}`);

    try {
        userData.profilePhotoURL = await uploadProfilePhoto(uid);
        await set(userRef, userData);
    } catch (error) {
        customErrorToast("Bir sorun meydana geldi");
        throw error; 
    }
};


//=================== Add new user to database | Google Registration ===================


export const newUserRegistrationWithGoogle = async (uid, userInfo) => {

    const { email, displayName, photoURL } = userInfo;
    
    const userData = {
        email: email,
        nameAndSurname: displayName,
        phoneNumber: 'belirtilmedi', 
        gender: 'belirtilmedi',
        profilePhotoURL: '',
    };

    const userRef = dbRef(db, `Data/Users/${uid}`);

    try {
        userData.profilePhotoURL = await uploadProfilePhoto(uid, photoURL);
        await set(userRef, userData);
    } catch (error) {
        customErrorToast("Bir sorun meydana geldi");
    }
};


//=================== Add new user to database | Facebook Registration ===================

export const newUserRegistrationWithFacebook = async (uid, userInfo) => {
    const { email, displayName, photoURL } = userInfo;

    const userData = {
        email: email,
        nameAndSurname: displayName,
        phoneNumber: 'belirtilmedi',
        gender: 'belirtilmedi', 
        profilePhotoURL: '', 
    };

    const userRef = dbRef(db, `Data/Users/${uid}`);

    try {
        userData.profilePhotoURL = await uploadProfilePhoto(uid, photoURL);
        await set(userRef, userData);
    } catch (error) {
        customErrorToast("Bir sorun meydana geldi");
        throw error; 
    }
};

//=================== Upload profile photo to Firebase Storage ===================

const uploadProfilePhoto = async (uid, photoURL = userDefaultProfilePhoto) => {
    const imageRef = storageRef(storage, `users/${uid}/images/profilePhoto.png`);
    const response = await fetch(photoURL);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
    const profilePhotoURL = await getDownloadURL(imageRef);
    return profilePhotoURL;
};