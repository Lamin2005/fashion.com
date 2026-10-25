import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/states/auth";
import cartReducer from "./slices/states/cart";
import { apiSlice } from "./slices/api/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.VITE_MOOD !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
