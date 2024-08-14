import { createSlice } from '@reduxjs/toolkit';
import { removeProfilePhoto, updateProfileDetails, updateProfilePhoto } from '../../thunks/User/accountDetailsThunk';


const initialState = {
    updatedProfilePhoto: null,
    updatedProfileDetails: null,
    error: null,
    loading: false,
};

const accountDetailsSlice = createSlice({
    name: 'accountDetails',
    initialState,
    reducers: {
        clearUpdateInformations: (state) => {
            state.updatedProfilePhoto = null;
            state.updatedProfileDetails = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            //Update Profil Photo
            .addCase(updateProfilePhoto.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfilePhoto.fulfilled, (state, action) => {
                state.updatedProfilePhoto = action.payload;
                state.loading = false;
            })
            .addCase(updateProfilePhoto.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            //Remove Profile Photo
            .addCase(removeProfilePhoto.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeProfilePhoto.fulfilled, (state, action) => {
                state.updatedProfilePhoto = action.payload;
                state.loading = false;
            })
            .addCase(removeProfilePhoto.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            //Update Profile Details
            .addCase(updateProfileDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfileDetails.fulfilled, (state, action) => {
                state.updatedProfileDetails = action.payload;
                state.loading = false;
            })
            .addCase(updateProfileDetails.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

    }
});
export const { clearUpdateInformations } = accountDetailsSlice.actions;
export default accountDetailsSlice.reducer;