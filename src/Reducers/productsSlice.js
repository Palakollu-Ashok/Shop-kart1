import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsFunction } from "../Services/Apis";

const initialState = {
  items: [],
  state: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await getProductsFunction();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "Success";
      })
      .addCase(productsFetch.rejected, (state) => {
        state.status = "Rejected";
      });
  },
});

export default ProductsSlice.reducer;
