import { createSlice } from '@reduxjs/toolkit';
import { fetchProductDetailsByName } from "../../thunks/Products/productDetailsThunk";

const initialState = {
  viewedProducts: {},
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetailsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetailsByName.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, productData } = action.payload;
        state.viewedProducts[productId] = productData;
      })
      .addCase(fetchProductDetailsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productDetailsSlice.reducer;
