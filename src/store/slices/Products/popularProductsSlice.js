import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularProducts } from '../../thunks/Products/popularProductThunk';

const initialState = {
    popularProducts: [],
    loading: false,
    error: null
};

const popularProductsSlice = createSlice({
    name: 'popularProducts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPopularProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.popularProducts = action.payload;
            })
            .addCase(fetchPopularProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { } = popularProductsSlice.actions;
export default popularProductsSlice.reducer;
