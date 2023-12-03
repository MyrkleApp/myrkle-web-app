import { RootState } from "@/store";

export const selectExchangeType = (state: RootState) => state.exchange.exchangeType;
export const selectFromToken = (state: RootState) => state.exchange.fromToken;
export const selectToToken = (state: RootState) => state.exchange.toToken;

export const selectTfSell = (state: RootState) => state.exchange.tfSell;
export const selectTfImmediateOrCancel = (state: RootState) => state.exchange.tfImmediateOrCancel;
export const selectTfFillOrKill = (state: RootState) => state.exchange.tfFillOrKill;
