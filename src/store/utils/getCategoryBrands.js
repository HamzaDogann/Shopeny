

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCategoryBrands = createAsyncThunk(
    'filteredCategoryProducts/getCategoryBrands',
    async (categoryName, { getState, rejectWithValue }) => {
        try {
            const { products } = getState().categoryProducts;

            const brandSet = new Set();
            const categoryProducts = products[categoryName];

            if (categoryProducts) {
                Object.values(categoryProducts).forEach(product => {
                    brandSet.add(product.productBrand);
                });
            }

            return Array.from(brandSet);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
