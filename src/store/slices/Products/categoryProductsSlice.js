import { createSlice } from '@reduxjs/toolkit';
import { getCategoryProducts } from '../../thunks/Products/categoryProductsThunk';
import { filterProducts } from '../../utils/filterUtils';

const initialState = {
    products: {},
    loading: false,
    error: null,
    filters: {
        brands: [],
        priceRange: [0, 200000],
        colors: [],
        rating: 0,
        sortOption: 'priceAsc',
        isStock: false,
    },
};

const categoryProductSlice = createSlice({
    name: 'categoryProducts',
    initialState,
    reducers: {
        setBrands: (state, action) => {
            state.filters.brands = action.payload;
        },
        setPriceRange: (state, action) => {
            state.filters.priceRange = action.payload;
        },
        setColors: (state, action) => {
            state.filters.colors = action.payload;
        },
        setRating: (state, action) => {
            state.filters.rating = action.payload;
        },
        setSortOption: (state, action) => {
            state.filters.sortOption = action.payload;
        },
        setIsStock: (state, action) => {
            state.filters.isStock = action.payload;
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        }
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

export const { setBrands, setPriceRange, setColors, setRating, setSortOption, setIsStock, clearFilters, SetIsFilterOpen } = categoryProductSlice.actions;
export default categoryProductSlice.reducer;
