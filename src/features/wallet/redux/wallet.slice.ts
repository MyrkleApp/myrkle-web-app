import { createSlice } from "@reduxjs/toolkit";
import { IWalletInitialState } from "../types";

const initialState: IWalletInitialState = {
  assetType: "token",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    toggleAssetType(state) {
      if (state.assetType === "token") state.assetType = "nft";
      else state.assetType = "token";
    },
  },
});

export const { toggleAssetType } = walletSlice.actions;

export default walletSlice.reducer;
