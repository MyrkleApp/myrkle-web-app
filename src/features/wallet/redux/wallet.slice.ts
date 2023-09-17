import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWalletInitialState, TNetwork } from "../types";

const initialState: IWalletInitialState = {
  assetType: "token",
  network: "testnet",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    toggleAssetType(state) {
      if (state.assetType === "token") state.assetType = "nft";
      else state.assetType = "token";
    },
    setNetwork(state, { payload }: PayloadAction<TNetwork>) {
      state.network = payload;
    },
  },
});

export const { toggleAssetType, setNetwork } = walletSlice.actions;

export default walletSlice.reducer;
