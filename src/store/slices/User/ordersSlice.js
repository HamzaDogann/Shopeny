import { createSlice } from '@reduxjs/toolkit';
import { addOrder } from '../../thunks/User/ordersThunk';

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ordersSlice.reducer;
