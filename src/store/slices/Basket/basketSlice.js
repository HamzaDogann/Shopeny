import { createSlice } from '@reduxjs/toolkit';
import { addProductToBasket, fetchBasketData, removeBasketProduct, updateBasketProductAmount, clearBasket } from '../../thunks/Basket/basketThunk';
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
        totalPrice: 0,
    },
    loading: false,
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        removeProduct: (state, action) => {
            const { referenceId } = action.payload;
            state.basketProducts = state.basketProducts.filter(product => product.referenceId !== referenceId);
            state.information = updateBasketInformation(state.basketProducts, state.information);
        },
        updateCargoType: (state, action) => {
            state.information.cargoType = action.payload;
            state.information.cargoPrice = action.payload === "express" ? 100 : 50;
            state.information = updateBasketInformation(state.basketProducts, state.information);
        },
    },
    extraReducers: (builder) => {
        builder
            //========== Add product for basket ==========
            .addCase(addProductToBasket.pending, (state) => {
                state.loading = true;
            })
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
                state.loading = false;
            })
            .addCase(addProductToBasket.rejected, (state) => {
                state.loading = false;
            })

            //========== Get all of basket products ==========

            .addCase(fetchBasketData.fulfilled, (state, action) => {
                state.basketProducts = action.payload;
                state.information = updateBasketInformation(state.basketProducts, state.information);
            })

            //========== Update Basket Product Amount ==========
            .addCase(updateBasketProductAmount.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBasketProductAmount.fulfilled, (state, action) => {
                const { referenceId } = action.payload;

                const existingProductIndex = state.basketProducts.findIndex(
                    (product) => product.referenceId === referenceId
                );

                if (existingProductIndex >= 0) {
                    state.basketProducts[existingProductIndex] = {
                        ...action.payload
                    };
                }

                state.information = updateBasketInformation(state.basketProducts, state.information);
                state.loading = false;
            })
            .addCase(updateBasketProductAmount.rejected, (state) => {
                state.loading = false;
            })

            //========== Remove Basket Product ==========
            .addCase(removeBasketProduct.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(removeBasketProduct.fulfilled, (state, action) => {
                const { referenceId } = action.payload;
                state.basketProducts = state.basketProducts.filter(product => product.referenceId !== referenceId);
                state.information = updateBasketInformation(state.basketProducts, state.information);
                state.loading = false;
            })
            .addCase(removeBasketProduct.rejected, (state) => {
                state.loading = false;
            })

            //========== Clear Basket ==========
            .addCase(clearBasket.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearBasket.fulfilled, (state) => {
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
                state.loading = false;
            })
            .addCase(clearBasket.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { removeProduct, updateCargoType } = basketSlice.actions;
export default basketSlice.reducer;
