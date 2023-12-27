import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/redux/auth.slice";
import walletReducer from "@/features/wallet/redux/wallet.slice";
import exchangeReducer from "@/features/exchange/redux/exchange.slice";
import { xrpApi } from "@/features/shared/redux/xrp.api";
import { tokenApi } from "@/features/shared/redux/token.api";

const middleware = [xrpApi.middleware, tokenApi.middleware];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    exchange: exchangeReducer,
    [xrpApi.reducerPath]: xrpApi.reducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
