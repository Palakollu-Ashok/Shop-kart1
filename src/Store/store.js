import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer, { productsFetch } from "../Reducers/productsSlice";
import CartReducer from "../Reducers/cartSlice";
import {
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../Reducers/cartThunk";

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: CartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { addToCart, updateCartItem, deleteCartItem, clearCart },
      },
    }),
});

store.dispatch(productsFetch());

export default store;
