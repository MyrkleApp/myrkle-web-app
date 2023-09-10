import { RootState } from "@/store";

export const selectExchangeType = (state: RootState) => state.exchange.exchangeType;
