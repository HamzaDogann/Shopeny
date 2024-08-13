import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, push, get, remove } from 'firebase/database';
import { db } from '../../../services/firebase/config';

// Add Favorite Product
export const addFavoriteProduct = createAsyncThunk(
    'favoriteProducts/addFavoriteProduct',
    async ({ userId, categoryName, productId }, { rejectWithValue }) => {
        try {
            const path = `Data/Users/${userId}/favoriteProducts`;
            const newFavoriteRef = ref(db, path);
            const favoriteProduct = {
                categoryName,
                productId,
            };

            const newRef = await push(newFavoriteRef, favoriteProduct);
            return { ...favoriteProduct, favoriteProductKey: newRef.key };
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.message);

        }
    }
);

// Fetch Favorite Products Refs
export const fetchFavoriteProductsRef = createAsyncThunk(
    'favoriteProducts/fetchFavoriteProducts',
    async ({ userId }, { rejectWithValue }) => {
        try {
            const path = `Data/Users/${userId}/favoriteProducts`;
            const favoriteProductsRef = ref(db, path);
            const snapshot = await get(favoriteProductsRef);

            if (snapshot.exists()) {
                const data = snapshot.val();

                const favoriteProductsArray = Object.entries(data).map(([key, value]) => ({
                    favoriteProductKey: key,
                    ...value,
                }));

                return favoriteProductsArray;
            } else {
                return [];

            }
        } catch (error) {
            return rejectWithValue(error.message);

        }
    }
);


// Fetch Product Details
export const fetchProducts = createAsyncThunk(
    'favoriteProducts/fetchProductDetails',
    async (favoriteProductsRef, { rejectWithValue }) => {
        try {
            const productsArray = [];
            console.log("veri çekme yine başladı")
            for (const { categoryName, productId } of favoriteProductsRef) {

                const path = `Data/Categories/${categoryName}/${productId}`;
                const productRef = ref(db, path);
                const snapshot = await get(productRef);

                if (snapshot.exists()) {
                    const productData = snapshot.val();
                    const product = {
                        Id: productId,
                        categoryName: productData.categoryName,
                        productBrand: productData.productBrand,
                        productName: productData.productName,
                        productStar: productData.productStar,
                        createdDate: productData.createdDate,
                        productNormalPrice: productData.productNormalPrice,
                        discountRate: productData.discountRate,
                        discountedPrice: productData.discountedPrice,
                        productImages: {
                            mainImage: productData.productImages?.mainImage || ''
                        }
                    };
                    productsArray.push(product);
                } else {
                    return rejectWithValue(error.message);
                }
            }

            return productsArray;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Remove Favorite Product
export const removeFavoriteProduct = createAsyncThunk(
    'favoriteProducts/removeFavoriteProduct',
    async ({ userId, categoryName, productId }, { rejectWithValue }) => {
        try {
            const path = `Data/Users/${userId}/favoriteProducts`;
            const favoriteProductsRef = ref(db, path);
            const snapshot = await get(favoriteProductsRef);

            if (snapshot.exists()) {
                const data = snapshot.val();

                const productKey = Object.keys(data).find(key =>
                    data[key].categoryName === categoryName &&
                    data[key].productId === productId
                );

                if (productKey) {
                    const productRef = ref(db, `${path}/${productKey}`);
                    await remove(productRef);
                    return { categoryName, productId };
                } else {
                    throw new Error('Product not found in favorites');
                }
            } else {
                throw new Error('No favorite products found');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//Clear Favorite Products

export const clearFavoriteProducts = createAsyncThunk(
    'favoriteProducts/clearFavoriteProducts',
    async ({ userId }, { rejectWithValue }) => {
        try {
            const path = `Data/Users/${userId}/favoriteProducts`;
            const favoriteProductsRef = ref(db, path);
            console.log(`favoriteProducts: ${favoriteProductsRef}`);
            await remove(favoriteProductsRef);

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);