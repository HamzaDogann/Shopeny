import { createSlice } from '@reduxjs/toolkit';
import { updateBasketInformation } from '../../utils/basketHelper';
import { promotions } from '../../../constants/promotions';
import { addProductToBasket, fetchBasketData, removeBasketProduct, updateBasketProductAmount, clearBasket } from '../../thunks/Basket/basketThunk';

const initialState = {
    basketProducts: [],
    information: {
        productsNumber: 0,
        productPrices: 0,
        cargoType: "normal",
        cargoPrice: 0,
        promotion: false,
        promotionDiscount: 0,
        totalPrice: 0,
    },
    loading: false,
    error: null,
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
            state.information.cargoPrice = action.payload === "express" ? 80 : 0;
            state.information = updateBasketInformation(state.basketProducts, state.information);
        },
        updatePromotion: (state, action) => {

            const promotionCode = action.payload.toLowerCase();

            const foundPromotion = promotions.find(promo => promo.code.toLowerCase() === promotionCode);

            if (foundPromotion) {
                state.information.promotion = true;
                state.information.promotionDiscount = foundPromotion.discount;
                state.information = updateBasketInformation(state.basketProducts, state.information);
            } else {
                state.error = "wrong-promotion";
                state.information.promotion = false;
                state.information.promotionDiscount = 0;
                state.information = updateBasketInformation(state.basketProducts, state.information);
            }
        },

        removePromotion: (state) => {
            state.information.promotion = false;
            state.information.promotionDiscount = 0;
            state.information = updateBasketInformation(state.basketProducts, state.information);
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //========== Add product for basket ==========
            .addCase(addProductToBasket.pending, (state) => {
                state.loading = true;
                state.error = null;
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
                state.error = null; 
            })
            .addCase(addProductToBasket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
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

export const { removeProduct, updateCargoType, clearError, updatePromotion, removePromotion } = basketSlice.actions;
export default basketSlice.reducer;
