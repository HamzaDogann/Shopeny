import { createSlice } from '@reduxjs/toolkit';
import { removeProfilePhoto, updateProfilePhoto } from '../../thunks/User/accountDetailsThunk';


const initialState = {
    updatedProfilePhoto: null,
    updatedProfileDetails: [],
    error: null,
    loading: false,
};

const accountDetailsSlice = createSlice({
    name: 'accountDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateProfilePhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfilePhoto.fulfilled, (state, action) => {
                state.updatedProfilePhoto = action.payload;
                state.loading = false;
            })
            .addCase(updateProfilePhoto.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(removeProfilePhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProfilePhoto.fulfilled, (state, action) => {
                state.updatedProfilePhoto = action.payload;
                state.loading = false;
            })
            .addCase(removeProfilePhoto.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default accountDetailsSlice.reducer;