import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
    message: '',
    confirmText: '',
    cancelText: '',
  },
  reducers: {
    showModal: (state, action) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.confirmText = action.payload.confirmText;
      state.cancelText = action.payload.cancelText;
    },
    hideModal: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
