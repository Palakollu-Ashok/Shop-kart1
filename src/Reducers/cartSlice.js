import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCartSuccess: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);
    },
    getCartDetailsSuccess: (state, action) => {
      const cartDetails = action.payload;

      state.items = cartDetails;
    },
    updateCartItemSuccess: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    deleteCartItemSuccess: (state, action) => {
      const { productId } = action.payload;
      const index = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearCartSuccess: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCartSuccess,
  getCartDetailsSuccess,
  updateCartItemSuccess,
  deleteCartItemSuccess,
  clearCartSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
