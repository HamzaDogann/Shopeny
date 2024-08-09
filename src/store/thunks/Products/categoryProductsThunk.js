import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoryProducts } from "../../utils/fetchCategoryProducts";

const categoryTranslation = {
    'bilgisayar': 'computers',
    'telefon': 'phones',
    'televizyon': 'televisions',
    'kulaklik': 'headphones',
    'mikrofon': 'microphones',
    'oyuncu-fareleri': 'gaming-mice',
    'klavye': 'keyboards',
    'kamera': 'cameras'
};

export const getCategoryProducts = createAsyncThunk(
    'categoryProducts/fetchCategoryProducts',
    async (categoryName, { getState, rejectWithValue }) => {
        try {
            const { products } = getState().categoryProducts;

            if (products[categoryName]) {
                return { categoryName, products: products[categoryName] };
            }

            const englishCategoryName = categoryTranslation[categoryName] || categoryName;
            const categoryProducts = await fetchCategoryProducts(englishCategoryName);

            return { categoryName, categoryProducts };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
