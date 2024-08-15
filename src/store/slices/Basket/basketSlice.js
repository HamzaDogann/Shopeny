import { createSlice } from '@reduxjs/toolkit';
import { addProductToBasket, fetchBasketData } from '../../thunks/Basket/basketThunk';
import { updateBasketInformation } from '../../utils/basketHelper';

const initialState = {
    basketProducts: [],
    information: {
        productsNumber: 0,
        productPrices: 0,
        cargoType: "normal",
        cargoPrice: 50,
        promotion: false,
        promotionDiscount: 0,
        totalPrice: 0
    }
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        // Ürün silme işlemi
        removeProduct: (state, action) => {
            const { referenceId } = action.payload;
            state.basketProducts = state.basketProducts.filter(product => product.referenceId !== referenceId);
        },
        // Kargo türü güncelleme işlemi
        updateCargoType: (state, action) => {
            state.information.cargoType = action.payload;
            state.information.cargoPrice = action.payload === "express" ? 100 : 50;
            state.information = updateBasketInformation(state.basketProducts, state.information);
        },
        // Sepetteki tüm ürünleri temizleme işlemi
        clearBasket: (state) => {
            state.basketProducts = [];
            state.information = {
                productsNumber: 0,
                productPrices: 0,
                cargoType: "normal",
                cargoPrice: 50,
                promotion: false,
                promotionDiscount: 0,
                totalPrice: 0
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductToBasket.fulfilled, (state, action) => {
                const { referenceId } = action.payload;

                const existingProductIndex = state.basketProducts.findIndex(
                    (product) => product.referenceId === referenceId
                );

                if (existingProductIndex >= 0) {
                    state.basketProducts[existingProductIndex] = {
                        ...state.basketProducts[existingProductIndex],
                        amount: action.payload.amount
                    };
                } else {
                    state.basketProducts.push(action.payload);
                }

                state.information = updateBasketInformation(state.basketProducts, state.information);
            })
            .addCase(fetchBasketData.fulfilled, (state, action) => {
                state.basketProducts = action.payload;

                state.information = updateBasketInformation(state.basketProducts, state.information);
            })
            .addCase(addProductToBasket.rejected, (action) => {
                console.error("Ürün eklenirken bir hata oluştu:", action.payload);
            })
            .addCase(fetchBasketData.rejected, (state, action) => {
                console.error("Sepet verileri çekilirken bir hata oluştu:", action.payload);
            });
    },
});

export const { removeProduct, updateCargoType, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
