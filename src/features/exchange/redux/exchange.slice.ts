import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IExchangeInitialState } from "../types";
import { xrpToken } from "@/constants";
import { IToken } from "@/features/shared/types";

const initialState: IExchangeInitialState = {
  exchangeType: "swap",
  fromToken: xrpToken,
  toToken: xrpToken,
  tfSell: false,
  tfImmediateOrCancel: false,
  tfFillOrKill: false,
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
    setTfSell(state, { payload }: PayloadAction<boolean>) {
      state.tfSell = payload;
    },
    setTfImmediateOrCancel(state, { payload }: PayloadAction<boolean>) {
      state.tfImmediateOrCancel = payload;
    },
    setTfFillOrKill(state, { payload }: PayloadAction<boolean>) {
      state.tfFillOrKill = payload;
    },
  },
});

export const {
  toggleExchangeType,
  setFromToken,
  setToToken,
  setTfSell,
  setTfImmediateOrCancel,
  setTfFillOrKill,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
