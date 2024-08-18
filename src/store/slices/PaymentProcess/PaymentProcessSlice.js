import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAddressSelected: null,
    selectedAddressId: null,
    isPaymentInfoReceived: false,
    paymentInformations: {
        nameOnCard: "",
        cardNumber: "",
        month: "",
        year: "",
        cvv: "",
    },
    isPaymentConfirmed: false,
};

const paymentProcessSlice = createSlice({
    name: 'paymentProcess',
    initialState,
    reducers: {
        setIsAddress: (state, action) => {
            const id = action.payload;
            if (id) {
                state.isAddressSelected = true;
                state.selectedAddressId = id;
            } else {
                state.isAddressSelected = null;
                state.selectedAddressId = null;
            }
        },
        setPaymentInformations: (state, action) => {
            state.paymentInformations = action.payload;
            state.isPaymentInfoReceived = action.payload.nameOnCard !== '';
        },
        setIsPaymentInfoReceived: (state, action) => {
            state.isPaymentInfoReceived = action.payload;
        }
    }
});

export const { setIsAddress, setPaymentInformations, setIsPaymentInfoReceived } = paymentProcessSlice.actions;
export default paymentProcessSlice.reducer;
