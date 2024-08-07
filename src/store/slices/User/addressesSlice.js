import { createSlice } from '@reduxjs/toolkit';
import { startLoading, stopLoading } from '../PreLoader/preLoaderSlice';
import { addUserAddress, getUserAddresses, removeUserAddress, updateUserAddress } from '../AccountDetails/addressesThunk';

const initialState = {
    addresses: [],
    error: null,

};

const addressesSlice = createSlice({
    name: 'addresses',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //Get Addresses from Realtime Database
            .addCase(getUserAddresses.pending, (state) => {
                state.error = null;
                startLoading();
            })
            .addCase(getUserAddresses.fulfilled, (state, action) => {
                state.addresses = action.payload;
                stopLoading();
            })
            .addCase(getUserAddresses.rejected, (state, action) => {
                state.error = action.error.message;
                stopLoading();
            })

            //Add Address
            .addCase(addUserAddress.pending, (state) => {
                state.error = null;
                startLoading();
            })
            .addCase(addUserAddress.fulfilled, (state, action) => {
                state.addresses.push(action.payload);
                stopLoading();
            })
            .addCase(addUserAddress.rejected, (state, action) => {
                state.error = action.error.message;
                stopLoading();
            })

            //Update Address

            .addCase(updateUserAddress.pending, (state) => {
                state.error = null;
                startLoading();
            })
            .addCase(updateUserAddress.fulfilled, (state, action) => {
                const updatedAddress = action.payload;
                state.addresses = state.addresses.map(address => address.id === updatedAddress.id ? updatedAddress : address);
                stopLoading();
            }
            )
            .addCase(updateUserAddress.rejected, (state, action) => {
                state.error = action.error.message;
                stopLoading();
            })

            //Remove Address

            .addCase(removeUserAddress.pending, (state) => {
                state.error = null;
                startLoading();
            })

            .addCase(removeUserAddress.fulfilled, (state, action) => {
                state.addresses = state.addresses.filter(address => address.id !== action.payload);
                stopLoading();
            })
            .addCase(removeUserAddress.rejected, (state, action) => {
                state.error = action.error.message;
                stopLoading();
            })
    }
});

export const { } = addressesSlice.actions;
export default addressesSlice.reducer;