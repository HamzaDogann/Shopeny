import { createSlice } from '@reduxjs/toolkit';
import { getCategoryProducts } from '../../thunks/Products/categoryProductsThunk';


const initialState = {
    products: {},
    loading: false,
    error: null,
};

const categoryProductSlice = createSlice({
    name: 'categoryProducts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryProducts.fulfilled, (state, action) => {
                state.loading = false;
                const { categoryName, categoryProducts } = action.payload;
                state.products[categoryName] = categoryProducts;
            })
            .addCase(getCategoryProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default categoryProductSlice.reducer;
