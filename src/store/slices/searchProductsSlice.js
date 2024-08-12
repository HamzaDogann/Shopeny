import { createSlice } from '@reduxjs/toolkit';
import { searchProductsThunk } from '../thunks/searchProductsThunk';

const initialState = {
    resultProducts: [],
    loading: false,
    error: null,
};

const searchProductsSlice = createSlice({
    name: 'searchProducts',
    initialState,
    reducers: {
        clearSearchResults: (state) => {
            state.resultProducts = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProductsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.resultProducts = action.payload.results;
            })
            .addCase(searchProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSearchResults } = searchProductsSlice.actions;
export default searchProductsSlice.reducer;
