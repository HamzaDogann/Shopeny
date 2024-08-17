import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAddressSelected: false,
    selectedAddressId: null,
    isPaymentInfoReceived: false,
    paymentInformations: {},
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
                state.isAddressSelected = false;
                state.selectedAddressId = null;
            }
        },
    }
});

export const { setIsAddress } = paymentProcessSlice.actions;
export default paymentProcessSlice.reducer;