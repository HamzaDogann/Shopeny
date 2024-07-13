//Auth Slice
import {
    setUser,
    clearUser,
} from './authSlice';

//Firebase Configuration
import { auth, db } from "../../../services/firebase/config";
import { get, query, ref, orderByChild, equalTo } from 'firebase/database';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from 'firebase/auth';

//Cookie
import Cookies from 'js-cookie';

//Loading Process - Alerts
import { customErrorToast, customSuccessToast } from '../../../shared/utils/CustomToasts';
import { startLoading, stopLoading } from "../PreLoader/preLoaderSlice";
import { newUserRegistration, newUserRegistrationWithGoogle, newUserRegistrationWithFacebook } from '../../../services/firebase/database/newUserRegisterOperations';

export const authActions = {

    //========== Login Method | Email/Password==========\\

    loginWithEmail: (email, password) => async (dispatch) => {

        dispatch(startLoading());

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            const userRef = ref(db, `Data/Users/${uid}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                const user = { userData };

                dispatch(setUser(user));
                Cookies.set('user', JSON.stringify(user));
            }

            customSuccessToast("Giriş Başarılı");

        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                customErrorToast("Geçersiz email adresi");
            }
            else if (error.code === 'auth/user-not-found') {
                customErrorToast("Bu email ile kayıtlı kullanıcı bulunamadı");
            }
            else if (error.code === 'auth/invalid-credential') {
                customErrorToast("Email veya Şifre Yalnış");
            }
            else if (error.code === 'auth/wrong-password') {
                customErrorToast("Geçersiz şifre");
            } else {
                customErrorToast(error.message);
            }
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
            console.log("normal girişten dönen veri:", userCredential.user);
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

            const usersRef = ref(db, 'Data/Users');
            const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));

            // Veriyi alın
            const snapshot = await get(emailQuery);


            if (!snapshot.exists()) {
                customErrorToast("Bu email ile kayıtlı kullanıcı bulunamadı");
                return;
            }


            await sendPasswordResetEmail(auth, email);
            customSuccessToast("Sıfırlama bağlantısı gönderildi");
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                customErrorToast("Bu email ile kayıtlı kullanıcı bulunamadı");
            } else {
                customErrorToast(error.message);
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
            Cookies.remove('user');
        } catch (error) {
            customErrorToast(error.message);
        } finally {
            dispatch(stopLoading());
        }
    },
};
