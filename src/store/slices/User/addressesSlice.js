import { createSlice } from '@reduxjs/toolkit';
import { addUserAddress, getUserAddresses, removeUserAddress, updateUserAddress } from "../../thunks/User/addressesThunk";

const initialState = {
    addresses: [],
    error: null,
    loading: false,  // Loading state ekleyin
};

const addressesSlice = createSlice({
    name: 'addresses',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearAddresses: (state) => {
            state.addresses = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All Addresses
            .addCase(getUserAddresses.pending, (state) => {
                state.loading = true;  // Loading başlat
                state.error = null;
            })
            .addCase(getUserAddresses.fulfilled, (state, action) => {
                state.loading = false;  // Loading durdur
                state.addresses = action.payload ? Object.values(action.payload) : [];
            })
            .addCase(getUserAddresses.rejected, (state, action) => {
                state.loading = false;  // Loading durdur
                state.error = action.error.message;
            })

            // Add Address
            .addCase(addUserAddress.pending, (state) => {
                state.loading = true;  // Loading başlat
                state.error = null;
            })
            .addCase(addUserAddress.fulfilled, (state, action) => {
                state.loading = false;  // Loading durdur
                state.addresses.push(action.payload);
            })
            .addCase(addUserAddress.rejected, (state, action) => {
                state.loading = false;  // Loading durdur
                state.error = action.error.message;
            })

            // Update Address
            .addCase(updateUserAddress.pending, (state) => {
                state.loading = true;  // Loading başlat
                state.error = null;
            })
            .addCase(updateUserAddress.fulfilled, (state, action) => {
                state.loading = false;  // Loading durdur
                const updatedAddress = action.payload;
                state.addresses = state.addresses.map(address => address.id === updatedAddress.id ? updatedAddress : address);
            })
            .addCase(updateUserAddress.rejected, (state, action) => {
                state.loading = false;  // Loading durdur
                state.error = action.error.message;
            })

            // Remove Address
            .addCase(removeUserAddress.pending, (state) => {
                state.loading = true;  // Loading başlat
                state.error = null;
            })
            .addCase(removeUserAddress.fulfilled, (state, action) => {
                state.loading = false;  // Loading durdur
                state.addresses = state.addresses.filter(address => address.id !== action.payload);
            })
            .addCase(removeUserAddress.rejected, (state, action) => {
                state.loading = false;  // Loading durdur
                state.error = action.error.message;
            })
    }
});

export const { clearAddresses } = addressesSlice.actions;
export default addressesSlice.reducer;
