import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false
}

const preloaderSlice = createSlice({
    name: 'preloader',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        }
    }
});

export const { startLoading, stopLoading } = preloaderSlice.actions;

export default preloaderSlice.reducer;
