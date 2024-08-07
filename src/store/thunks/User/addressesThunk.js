import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, remove, get, update } from 'firebase/database';
import {db} from "../../../services/firebase/config";

// Get User Addresses
export const getUserAddresses = createAsyncThunk(
    'addresses/getUserAddresses',
    async (userId) => {
        try {
            const dbRef = ref(db, `Data/Users/${userId}/addresses`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

// Add User Address
export const addUserAddress = createAsyncThunk(
    'addresses/addUserAddress',
    async ({ userId, address }) => {
        try {
            const dbRef = ref(db, `Data/Users/${userId}/addresses/${address.id}`);
            await set(dbRef, address);
            return address;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

// Update User Address
export const updateUserAddress = createAsyncThunk(
    'addresses/updateUserAddress',
    async ({ userId, address }) => {
        try {
            const dbRef = ref(db, `Data/Users/${userId}/addresses/${address.id}`);
            await update(dbRef, address);
            return address;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

// Remove User Address
export const removeUserAddress = createAsyncThunk(
    'addresses/removeUserAddress',
    async ({ userId, addressId }) => {
        try {
            const dbRef = ref(db, `Data/Users/${userId}/addresses/${addressId}`);
            await remove(dbRef);
            return addressId;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);