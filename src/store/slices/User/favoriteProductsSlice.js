import { createSlice } from '@reduxjs/toolkit';
import { addFavoriteProduct, clearFavoriteProducts, fetchFavoriteProductsRef, fetchProducts, removeFavoriteProduct } from '../../thunks/User/favoriteProductThunk';

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
        clearFavorites: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            //Add Favorite Product
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

            //Fetch Favorite Products Refs
            .addCase(fetchFavoriteProductsRef.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavoriteProductsRef.fulfilled, (state, action) => {
                state.loading = false;
                state.favoriteProductsRef = action.payload;
            })
            .addCase(fetchFavoriteProductsRef.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            //Fetch Favorite Products
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

            //Remove Favorite Product
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
            })

            //Clear All Favorite Products
            .addCase(clearFavoriteProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearFavoriteProducts.fulfilled, (state) => {
                state.loading = false;
                state.favoriteProductsRef = [];
                state.favoriteProducts = [];
            })
            .addCase(clearFavoriteProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { clearFavorites } = favoriteProductsSlice.actions;
export default favoriteProductsSlice.reducer;
