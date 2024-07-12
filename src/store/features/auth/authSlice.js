import { createSlice } from '@reduxjs/toolkit';

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
            state.user = [];
            state.error = null;
        },
    },
});

export const { setUser, setError, clearUser } = authSlice.actions;

export default authSlice.reducer;