import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database'; // Doğru importları yapıyoruz
import { db } from '../../services/firebase/config'; // Firebase bağlantısını import ediyoruz
import { categoryTranslation } from '../../constants/categories';

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
                        const translatedCategoryName = Object.keys(categoryTranslation).find(key => categoryTranslation[key] === categoryName) || categoryName;
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