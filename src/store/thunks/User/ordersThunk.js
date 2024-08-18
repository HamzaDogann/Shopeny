import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, push } from 'firebase/database';
import { db } from '../../../services/firebase/config';
import { getUserId } from '../../utils/getUserId';

export const addOrder = createAsyncThunk(
    'orders/addOrder',
    async ({ orderData }, { rejectWithValue }) => {
        const userId = getUserId();
        const ordersRef = ref(db, `Data/Users/${userId}/orders`);
console.log(orderData);
        try {
            // Firebase'in otomatik olarak oluşturduğu benzersiz referansı almak için `push()` kullanın
            const newOrderRef = push(ordersRef);
            const orderId = newOrderRef.key; // Referansın benzersiz anahtarını al

            // orderData'ya orderId ekle
            const orderWithId = { ...orderData, orderId };
            await set(newOrderRef, orderWithId);
            return orderWithId; // orderId ile birlikte döndür
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);