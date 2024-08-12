import { createSlice } from '@reduxjs/toolkit';
import { addFavoriteProduct, fetchFavoriteProductsRef, fetchProducts, removeFavoriteProduct } from '../../thunks/User/favoriteProductThunk';

const initialState = {
    favoriteProductsRef: [],
    favoriteProducts: [],
    loading: false,
    error: null,
};

const favoriteProductsSlice = createSlice({
    name: 'favoriteProducts',
    initialState,
    reducers: {
        clearFavorites: (state) => {
            state.favoriteProductsRef = [];
            state.favoriteProducts = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFavoriteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFavoriteProduct.fulfilled, (state, action) => {
                state.loading = false;
                const { categoryName, productId } = action.payload;

                const isExisting = state.favoriteProductsRef.some(
                    product => product.categoryName === categoryName && product.productId === productId
                );

                if (!isExisting) {
                    state.favoriteProductsRef.push(action.payload);
                }
            })
            .addCase(addFavoriteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchFavoriteProductsRef.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavoriteProductsRef.fulfilled, (state, action) => {
                state.loading = false;
                state.favoriteProductsRef = action.payload;
                state.favoriteProducts = [];
            })
            .addCase(fetchFavoriteProductsRef.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.favoriteProducts = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(removeFavoriteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFavoriteProduct.fulfilled, (state, action) => {
                state.loading = false;
                const { categoryName, productId } = action.payload;

                state.favoriteProductsRef = state.favoriteProductsRef.filter(
                    product => !(product.categoryName === categoryName && product.productId === productId)
                );

                state.favoriteProducts = state.favoriteProducts.filter(
                    product => !(product.categoryName === categoryName && product.Id === productId)
                );
            })
            .addCase(removeFavoriteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { clearFavorites } = favoriteProductsSlice.actions;

export default favoriteProductsSlice.reducer;
