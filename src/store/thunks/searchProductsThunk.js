import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database'; 
import { db } from '../../services/firebase/config'; 
import { translateCategoryNameToTurkish } from '../../constants/categories';

export const searchProductsThunk = createAsyncThunk(
    'searchProducts/searchProductsThunk',
    async (query, { rejectWithValue }) => {
        try {
            const categoriesRef = ref(db, 'Data/Categories');
            const snapshot = await get(categoriesRef);
            const categories = snapshot.val();
            const results = [];

            for (const categoryName in categories) {
                const productsRef = ref(db, `Data/Categories/${categoryName}`);
                const productsSnapshot = await get(productsRef);
                const products = productsSnapshot.val();

                for (const productId in products) {
                    const product = products[productId];
                    if (product.productName.toLowerCase().includes(query.toLowerCase())) {
                        const translatedCategoryName = translateCategoryNameToTurkish(categoryName);
                        results.push({ ...product, categoryName: translatedCategoryName });
                    }
                }
            }

            return { query, results };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);