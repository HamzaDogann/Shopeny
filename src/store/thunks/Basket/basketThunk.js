import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from "../../../services/firebase/config";
import { ref, set, get, push } from 'firebase/database';
import { getUserId } from '../../utils/getUserId';


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
        } catch {
            console.log("Ürün eklenirken bir hata oluştu:");
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

export const updateBasketProductAmount = createAsyncThunk(
    'basket/updateBasketProductAmount',
    async ({ referenceId, amountDelta }, thunkAPI) => {
        const userId = getUserId();
        try {
            const basketRef = ref(db, `Data/Users/${userId}/basket`);
            const snapshot = await get(basketRef);

            let productToUpdate = null;
            let keyToUpdate = null;

            snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                if (key === referenceId) {
                    productToUpdate = childSnapshot.val();
                    keyToUpdate = key;
                }
            });

            if (productToUpdate) {
                const updatedAmount = productToUpdate.amount + amountDelta; // amountDelta kullanarak güncelle
                if (updatedAmount > 0) { // Miktarın 0'ın altına düşmemesi için kontrol et
                    await set(ref(db, `Data/Users/${userId}/basket/${keyToUpdate}`), {
                        ...productToUpdate,
                        amount: updatedAmount
                    });
                    return { ...productToUpdate, amount: updatedAmount, referenceId: keyToUpdate };
                } else {
                    throw new Error('Miktar 0’ın altına düşemez.');
                }
            } else {
                throw new Error('Güncellenecek ürün bulunamadı.');
            }
        } catch (error) {
            console.log("Ürün miktarını güncellerken bir hata oluştu:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);