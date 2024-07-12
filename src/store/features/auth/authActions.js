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
        const { email, password, name, gender, phone } = formData;
        dispatch(startLoading());
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = { uid: userCredential.user.uid };
            dispatch(setUser(user));
            customSuccessToast("Hesap Oluşturuldu");
        } catch (error) {
            customErrorToast("Bu e-mail ile kayıtlı kullanıcı bulunuyor");
        } finally {
            dispatch(stopLoading());
        }
    },

    //========== Login with Google Method ==========\\

    loginWithGoogle: () => async (dispatch) => {
        const provider = new GoogleAuthProvider();
        dispatch(startLoading());
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = { uid: userCredential.user.uid, name: userCredential.user.displayName };
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
            const user = { uid: userCredential.user.uid, name: userCredential.user.displayName };
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
