import { RootState } from "@/store";

export const selectExchangeType = (state: RootState) => state.exchange.exchangeType;
export const selectFromToken = (state: RootState) => state.exchange.fromToken;
export const selectToToken = (state: RootState) => state.exchange.toToken;
