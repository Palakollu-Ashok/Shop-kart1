import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCartItemsFunction,
  clearCartFunction,
  deleteCartItemsFunction,
  getCartItemsFunction,
  updateCartItemsFunction,
} from "../Services/Apis";
import { getCartDetailsSuccess } from "./cartSlice";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkAPI) => {
    const response = await addCartItemsFunction(data);

    if (response.data) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.error);
    }
  }
);

export const getCartDetails = createAsyncThunk(
  "cart/getCartDetails",
  async (id, thunkAPI) => {
    const response = await getCartItemsFunction(id);

    if (response.data) {
      thunkAPI.dispatch(getCartDetailsSuccess(response.data));
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.error);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (data, thunkAPI) => {
    const { id, productId } = data;
    const response = await updateCartItemsFunction(data, id, productId);
    if (response.data) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.error);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ id, productId }, thunkAPI) => {
    const response = await deleteCartItemsFunction(id, productId);
    if (response.data) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.error);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (id, thunkAPI) => {
    const response = await clearCartFunction(id);
    if (response.data) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.error);
    }
  }
);
