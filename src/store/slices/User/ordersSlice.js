import { createSlice } from '@reduxjs/toolkit';
import { addOrder, fetchOrders, removeOrder } from '../../thunks/User/ordersThunk';

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrders: (state) => {
            Object.assign(state, initialState);
        }

    },
    extraReducers: (builder) => {
        builder

            //Get All Orders
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Add Order
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
            })

            //Remove Order

            .addCase(removeOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order.orderId !== action.payload);
            })
            .addCase(removeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const {clearOrders} = ordersSlice.actions;
export default ordersSlice.reducer;
