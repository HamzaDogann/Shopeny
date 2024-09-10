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

//Auth Slice
import {
    setUser,
    clearUser,
} from './authSlice';

//Remove All User Datas
import { clearAddresses } from "../User/addressesSlice";


//Loading Process - Alerts
import { customErrorToast, customSuccessToast } from '../../../shared/utils/CustomToasts';
import { startLoading, stopLoading } from "../preLoaderSlice";
import { newUserRegistration, newUserRegistrationWithGoogle } from '../../../services/firebase/database/newUserRegisterOperations';
import { clearFavorites } from "../User/favoriteProductsSlice";
import { clearUpdateInformations } from "../User/accountDetailsSlice";
import { clearPaymentProcess } from "../PaymentProcess/PaymentProcessSlice";
import { clearOrders } from "../User/ordersSlice";


export const authActions = {

    //========== Register Method | Email/Password/UserInformations ==========\\
    registerWithEmail: (formData, callback) => async (dispatch) => {
        dispatch(startLoading());
        const { email, password } = formData;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Register New User
            const uid = userCredential.user.uid;
            await newUserRegistration(uid, formData);

            customSuccessToast("Hesap Oluşturuldu");

            if (callback) {
                callback();
            }

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

    //========== Login Method | Email/Password ==========\\
    loginWithEmail: (email, password) => async (dispatch) => {
        dispatch(startLoading());

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await handleUserLogin(userCredential, dispatch);
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                customErrorToast("Geçersiz email adresi");
            } else if (error.code === 'auth/user-not-found') {
                customErrorToast("Bu email ile kayıtlı kullanıcı bulunamadı");
            } else if (error.code === 'auth/invalid-credential') {
                customErrorToast("Email veya Şifre Yalnış");
            } else if (error.code === 'auth/wrong-password') {
                customErrorToast("Geçersiz şifre");
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

            const userDoc = await checkUserFromDatabase(uid);

            if (!userDoc) {
                const userInfo = {
                    email: userCredential.user.email,
                    displayName: userCredential.user.displayName,
                    photoURL: userCredential.user.photoURL,
                };
                await newUserRegistrationWithGoogle(uid, userInfo);
            }

            await handleUserLogin(userCredential, dispatch);

        } catch (error) {
            if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
                customErrorToast("Giriş işlemi iptal edildi");
            }
            else if (error.code === 'auth/account-exists-with-different-credential') {
                customErrorToast("Bu hesap başka kimlik ile ilişkili");
            }
            else {
                customErrorToast("Giriş Yapılamıyor, Tekrar Deneyiniz");
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

            const userDoc = await checkUserFromDatabase(uid);

            if (!userDoc) {
                const userInfo = {
                    email: userCredential.user.email,
                    displayName: userCredential.user.displayName,
                    photoURL: userCredential.user.photoURL,
                };
                await newUserRegistrationWithGoogle(uid, userInfo);
            }

            const userRef = ref(db, `Data/Users/${uid}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                dispatch(setUser(userData));
                customSuccessToast(`Hoşgeldin, ${userData.nameAndSurname}`);
            }

        } catch (error) {
            if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
                customErrorToast("Giriş işlemi iptal edildi");
            }
            else if (error.code === 'auth/account-exists-with-different-credential') {
                customErrorToast("Bu hesap başka kimlik ile ilişkili");
            }
            else {
                customErrorToast("Giriş Başarısız");
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
            const snapshot = await get(emailQuery);

            if (!snapshot.exists()) {
                customErrorToast("Bu email ile kayıtlı kullanıcı bulunamadı");
                return Promise.reject();
            }

            await sendPasswordResetEmail(auth, email);
            customSuccessToast("Sıfırlama bağlantısı gönderildi");
            return Promise.resolve(); 

        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                customErrorToast("Bu email ile kayıtlı kullanıcı bulunamadı");
            } else {
                customErrorToast(error.message);
            }
            return Promise.reject(error);
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
            clearUserDatas(dispatch);
            Cookies.remove('JWT');
            customSuccessToast("Çıkış yapıldı");

        } catch (error) {
            customErrorToast("Çıkış işlemi başarısız.");

        } finally {
            dispatch(stopLoading());
        }
    },
};



// ==== User Login Process ==== \\

const handleUserLogin = async (userCredential, dispatch) => {
    const uid = userCredential.user.uid;
    const userRef = ref(db, `Data/Users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        const userData = snapshot.val();
        dispatch(setUser(userData));

        let token = Cookies.get('JWT');

        if (!token) {
            token = await userCredential.user.getIdToken();
            Cookies.set('JWT', token, { expires: 7 });
        }

        customSuccessToast(`Hoşgeldin, ${userData.nameAndSurname}`);
    }
};


// ==== Remembering and logging in the user with token ==== \\

const getUserFromCookies = () => {
    const token = Cookies.get('JWT');
    return token ? token : null;
};

export const fetchUserData = () => async (dispatch) => {
    const token = getUserFromCookies();
    if (token) {
        try {

            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const uid = decodedToken.user_id;

            const userRef = ref(db, `Data/Users/${uid}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                dispatch(setUser(userData));
            }
        } catch (error) {

        }
    } else {
        dispatch(setUser(null));
    }
};

//===== Check User From Database =====

const checkUserFromDatabase = async (uid) => {
    try {
        const userRef = ref(db, `Data/Users/${uid}`);

        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return snapshot.val();

        } else {
            return null;
        }
    } catch {
        return null;
    }
};


//===== Remove User's data when logout =====\\
const clearUserDatas = (dispatch) => {
    dispatch(clearAddresses());
    dispatch(clearFavorites());
    dispatch(clearUpdateInformations());
    dispatch(clearPaymentProcess());
    dispatch(clearOrders());
}
