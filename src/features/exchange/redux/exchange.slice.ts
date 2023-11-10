import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IExchangeInitialState } from "../types";
import { xrpToken } from "@/constants";
import { IToken } from "@/features/shared/types";

const initialState: IExchangeInitialState = {
  exchangeType: "swap",
  fromToken: xrpToken,
  toToken: xrpToken,
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    toggleExchangeType(state) {
      if (state.exchangeType === "swap") state.exchangeType = "liquidity";
      else state.exchangeType = "swap";
    },
    setFromToken(state, { payload }: PayloadAction<IToken>) {
      state.fromToken = payload;
    },
    setToToken(state, { payload }: PayloadAction<IToken>) {
      state.toToken = payload;
    },
  },
});

export const { toggleExchangeType, setFromToken, setToToken } = exchangeSlice.actions;

export default exchangeSlice.reducer;
