import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "@/features/wallet/redux/wallet.slice";

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    // [marketplaceApi.reducerPath]: marketplaceApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marketplaceApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
