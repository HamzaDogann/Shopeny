import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from "../../../services/firebase/config";
import { ref, set, get, push } from 'firebase/database';


//======================== HELPER METHODS =============================

const getSelectedColor = (product, color) =>
    color || (product.productColors && product.productColors.length > 0 ? product.productColors[0] : "FFFFFF");

const createBasketProduct = (product, color, amount) => ({
    referenceId: `${product.categoryName}_${product.Id}_${color}`,
    productId: product.Id,
    productName: product.productName,
    productBrand: product.productBrand,
    discountedPrice: product.discountedPrice,
    mainImage: product.productImages.mainImage,
    color: color,
    amount: amount
});

//======================== THUNKS =============================

export const addProductToBasket = createAsyncThunk(
    'basket/addProductToBasket',
    async ({ uid, product, color, amount = 1 }, thunkAPI) => {
        try {
            const selectedColor = getSelectedColor(product, color);
            const basketRef = ref(db, `Data/Users/${uid}/basket`);

            const snapshot = await get(basketRef);
            let existingProduct = null;
            let referenceIdToUpdate = null;

            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                if (data.productId === product.Id && data.color === selectedColor) {
                    existingProduct = data;
                    referenceIdToUpdate = childSnapshot.key;
                }
            });

            if (existingProduct) {
                // Ürün mevcut ve renk eşleşiyor, sadece miktarı güncelle
                const updatedAmount = existingProduct.amount + amount;
                await set(ref(db, `Data/Users/${uid}/basket/${referenceIdToUpdate}`), {
                    ...existingProduct,
                    amount: updatedAmount
                });
                return { ...existingProduct, amount: updatedAmount, referenceId: referenceIdToUpdate };
            } else {
                // Ürün mevcut değil ya da renk farklı, yeni ürün ekle
                const newBasketProduct = createBasketProduct(product, selectedColor, amount);
                const newProductRef = push(basketRef); // Yeni referans oluştur
                await set(newProductRef, newBasketProduct); // Yeni ürün ekle
                return { ...newBasketProduct, referenceId: newProductRef.key }; // Döndür
            }
        } catch (error) {
            console.error("Ürün eklenirken bir hata oluştu:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchBasketData = createAsyncThunk(
    'basket/fetchBasketData',
    async (uid, thunkAPI) => {
        try {
            const basketRef = ref(db, `Data/Users/${uid}/basket`);
            const snapshot = await get(basketRef);

            if (!snapshot.exists()) {
                return []; 
            }

            const basketData = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                basketData.push({
                    ...data,
                    referenceId: childSnapshot.key
                });
            });

            return basketData; 
        } catch (error) {
            console.error("Sepet verileri çekilirken bir hata oluştu:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);