import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // [marketplaceApi.reducerPath]: marketplaceApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marketplaceApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
