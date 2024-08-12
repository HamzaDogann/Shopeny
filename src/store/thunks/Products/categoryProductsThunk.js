import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoryProducts } from "../../utils/fetchCategoryProducts";
import { translateCategoryNameToEnglish } from "../../../constants/categories";

export const getCategoryProducts = createAsyncThunk(
    'categoryProducts/fetchCategoryProducts',
    async (categoryName, { getState, rejectWithValue }) => {
        try {
            const { products } = getState().categoryProducts;

            if (products[categoryName]) {
                return { categoryName, products: products[categoryName] };
            }

            const englishCategoryName = translateCategoryNameToEnglish(categoryName);
            const categoryProducts = await fetchCategoryProducts(englishCategoryName);

            return { categoryName, categoryProducts };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);