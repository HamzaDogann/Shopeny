import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ref, get } from 'firebase/database';
import { db } from "../../../services/firebase/config";

const getUserFromCookies = () => {
    const token = Cookies.get('token');
    return token ? token : "usernologin";
};

const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

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
    }
    else{
        dispatch(setUser("usernologin"));
    }
};

export default authSlice.reducer;
