import { createSlice } from "@reduxjs/toolkit";
import { IExchangeInitialState } from "../types";

const initialState: IExchangeInitialState = {
  exchangeType: "swap",
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    toggleExchangeType(state) {
      if (state.exchangeType === "swap") state.exchangeType = "liquidity";
      else state.exchangeType = "swap";
    },
  },
});

export const { toggleExchangeType } = exchangeSlice.actions;

export default exchangeSlice.reducer;
