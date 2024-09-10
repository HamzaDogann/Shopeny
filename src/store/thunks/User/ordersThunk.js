import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, push, get, remove } from 'firebase/database';
import { db } from '../../../services/firebase/config';
import { getUserId } from '../../utils/getUserId';

export const addOrder = createAsyncThunk(
    'orders/addOrder',
    async ({ orderData }, { rejectWithValue }) => {
        const userId = getUserId();
        const ordersRef = ref(db, `Data/Users/${userId}/orders`);
        try {

            const newOrderRef = push(ordersRef);
            const orderId = newOrderRef.key;

            const orderWithId = { ...orderData, orderId };
            await set(newOrderRef, orderWithId);
            return orderWithId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        const userId = getUserId();
        const ordersRef = ref(db, `Data/Users/${userId}/orders`);
        try {
            const snapshot = await get(ordersRef);
            if (!snapshot.exists()) {
                return [];
            }
            const orders = snapshot.val();
            return Object.values(orders);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const removeOrder = createAsyncThunk(
    'orders/removeOrder',
    async ({ orderId }, { rejectWithValue }) => {
        const userId = getUserId();
        const orderRef = ref(db, `Data/Users/${userId}/orders/${orderId}`);
        try {
            await remove(orderRef);
            return orderId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);