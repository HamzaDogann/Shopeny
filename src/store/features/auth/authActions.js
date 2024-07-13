//Auth Slice
import {
    setUser,
    clearUser,
} from './authSlice';

//Firebase Configuration
import { auth } from "../../../services/firebase/config";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from 'firebase/auth';

//Loading Process - Alerts
import { customErrorToast, customSuccessToast } from '../../../shared/utils/CustomToasts';
import { startLoading, stopLoading } from "../PreLoader/preLoaderSlice";
import { newUserRegistration, newUserRegistrationWithGoogle } from '../database/databaseActions';

export const authActions = {

    //========== Login Method | Email/Password==========\\

    loginWithEmail: (email, password) => async (dispatch) => {
        dispatch(startLoading());
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            dispatch(setUser(userCredential.user));
            customSuccessToast("Giriş Başarılı");
        } catch (error) {
            customErrorToast(error.message);
        } finally {
            dispatch(stopLoading());
        }
    },

    //========== Register Method | Email/Password/UserInformations==========\\

    registerWithEmail: (formData) => async (dispatch) => {

        dispatch(startLoading());
        const { email, password } = formData;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Register New User
            const uid = userCredential.user.uid;
            await newUserRegistration(uid, formData);

            // Set User
            const user = { uid: userCredential.user.uid };
            dispatch(setUser(user));
            customSuccessToast("Hesap Oluşturuldu");

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                customErrorToast("Bu e-mail ile kayıtlı kullanıcı bulunuyor.");
            } else if (error.code === 'auth/invalid-email') {
                customErrorToast("Geçersiz e-mail adresi.");
            } else {
                customErrorToast("Kayıt işlemi sırasında bir hata oluştu.");
            }
        } finally {
            dispatch(stopLoading());
        }
    },

    //========== Login with Google Method ==========\\

    loginWithGoogle: () => async (dispatch) => {
        dispatch(startLoading());
        const provider = new GoogleAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);

            const uid = userCredential.user.uid;
            const userInfo = {
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL, 
            };

            // Google kaydı için yeni fonksiyonu çağır
            await newUserRegistrationWithGoogle(uid, userInfo);

            const user = { uid: uid, name: userInfo.displayName };
            dispatch(setUser(user));

            customSuccessToast("Giriş Başarılı");

        } catch (error) {
            if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
                customErrorToast("Giriş işlemi iptal edildi");
            } else {
                customErrorToast(error.message);
            }
        } finally {
            dispatch(stopLoading());
        }
    },

    //========== Login with Facebook Method ==========\\

    loginWithFacebook: () => async (dispatch) => {
        const provider = new FacebookAuthProvider();
        dispatch(startLoading());
    
        try {
            const userCredential = await signInWithPopup(auth, provider);
            
            const uid = userCredential.user.uid;
            const userInfo = {
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL, 
            };
    
           
            await newUserRegistrationWithFacebook(uid, userInfo);
    
            const user = { uid: uid, name: userInfo.displayName };
            dispatch(setUser(user));
            customSuccessToast("Giriş Başarılı");
    
        } catch (error) {
            if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
                customErrorToast("Giriş işlemi iptal edildi");
            } else {
                customErrorToast(error.message);
            }
        } finally {
            dispatch(stopLoading());
        }
    },

    //========== Reset Password with Email Method ==========\\

    resetPassword: (email) => async (dispatch) => {
        dispatch(startLoading());
        try {
            const donenDeger = await sendPasswordResetEmail(auth, email);
            console.log(donenDeger);
            customSuccessToast("Sıfırlama bağlantısı gönderildi");
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                customErrorToast("Bu email ile kayıtlı kullanıcı bulunamadı");
            } else {
                customErrorToast("İşlem başarısız");
            }
        } finally {
            dispatch(stopLoading());
        }
    },
    //========== Auth Logout ==========\\

    logout: () => async (dispatch) => {
        dispatch(startLoading());
        try {
            await signOut(auth);
            dispatch(clearUser());
        } catch (error) {

        } finally {
            dispatch(stopLoading());
        }
    },
};
