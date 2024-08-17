import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, remove, get, update } from 'firebase/database';
import { db } from "../../../services/firebase/config";
import { fetchData } from '../../utils/classicalFetchData';
import { addDataWithAutoId } from '../../utils/classicalAddData';
import { getUserId } from '../../utils/getUserId';

// Get User Addresses
export const getUserAddresses = createAsyncThunk(
    'addresses/getUserAddresses',
    async () => {
        const userId = getUserId();
        const path = `Data/Users/${userId}/addresses/`;
        const data = await fetchData(path);
        console.log("veri alındı ve bir kez çalıştı.")
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
            const addressId = await addDataWithAutoId(path, address);
            return { addressId: addressId, ...address };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Update User Address
export const updateUserAddress = createAsyncThunk(
    'addresses/updateUserAddress',
    async (address) => {
        const userId = getUserId();
        try {
            const dbRef = ref(db, `Data/Users/${userId}/addresses/${address.addressId}`);
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
    async (addressId) => {
        const userId = getUserId();
        try {
            const dbRef = ref(db, `Data/Users/${userId}/addresses/${addressId}`);
            await remove(dbRef);
        } catch (error) {
            console.log(error.message);
        }
    }
);