import { createSlice } from '@reduxjs/toolkit';
import { getCategoryBrands } from '../../utils/getCategoryBrands';

const initialState = {
    isFilterOpen: false,
    filters: {
        brands: [],
        priceRange: [0, 200000],
        colors: [],
        rating: 0,
        sortOption: 'priceAsc',
        isStock: false,
    },
    categoryBrands: [],
};

const filteredCategoryProductSlice = createSlice({
    name: 'filteredCategoryProducts',
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
        },
        setIsFilterMode: (state, action) => {
            state.isFilterOpen = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryBrands.fulfilled, (state, action) => {
                state.categoryBrands = action.payload;
            })
    },
});

export const { setIsFilterMode, setBrands, setPriceRange, setColors, setRating, setSortOption, setIsStock, clearFilters, SetIsFilterOpen } = filteredCategoryProductSlice.actions;
export default filteredCategoryProductSlice.reducer;
