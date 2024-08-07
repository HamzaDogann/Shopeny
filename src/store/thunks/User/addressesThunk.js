import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, remove, get, update } from 'firebase/database';
import { db } from "../../../services/firebase/config";
import { fetchData } from '../../utils/classicalFetchData';
import { addDataWithAutoId } from '../../utils/classicalAddData';
import { getUserId } from '../../utils/getUserId';

// Get User Addresses
export const getUserAddresses = createAsyncThunk(
    'addresses/getUserAddresses',
    async ({ userId }) => {
        const path = `Data/Users/${userId}/addresses/`;
        const data = await fetchData(path);
        return data;
    }
);


// Add User Address
export const addUserAddress = createAsyncThunk(
    'addresses/addUserAddress',
    async (address, { rejectWithValue }) => {
        const userId = getUserId();
        if (!userId) return rejectWithValue("Kullanıcı girişi yapılmadı");

        const path = `Data/Users/${userId}/addresses/`;
        try {
            const id = await addDataWithAutoId(path, address);
            return { id, ...address };
        } catch (error) {
            return rejectWithValue(error.message);
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
            console.log(error.message);
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