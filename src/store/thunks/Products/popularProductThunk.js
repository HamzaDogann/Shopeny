import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database';
import { db } from '../../../services/firebase/config';

export const fetchPopularProducts = createAsyncThunk(
    'popularProducts/fetchPopularProducts',
    async (_, { rejectWithValue }) => {
        try {

            const categoriesRef = ref(db, 'Data/Categories');
            const snapshot = await get(categoriesRef);

            if (!snapshot.exists()) {
                return rejectWithValue('Ürün bulunamadı');
            }

            const allProducts = [];
            const categoriesData = snapshot.val();

            for (const categoryName in categoriesData) {
                const products = categoriesData[categoryName];
                for (const productId in products) {
                    const product = products[productId];
                    if (product.productStar >= 4) {
                        allProducts.push(product);
                    }
                }
            }

            const shuffled = allProducts.sort(() => 0.5 - Math.random());
            const selectedProducts = shuffled.slice(0, 6);

            return selectedProducts;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);