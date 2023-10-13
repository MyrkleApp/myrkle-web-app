import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISignIn, IWalletInitialState, TNetwork } from "../types";

const initialState: IWalletInitialState = {
  assetType: "token",
  network: "testnet",
  address: "",
  isConnected: false,
  userToken: "",
  walletProvider: "",
};

// rGiyqjWjhsRZ8FUjBL2k5ciUa2tcptTX9W

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
    signIn(state, { payload }: PayloadAction<ISignIn>) {
      const { address, network, userToken, walletProvider } = payload;
      state.address = address;
      state.network = network;
      state.isConnected = true;
      state.userToken = userToken;
      state.walletProvider = walletProvider;
    },
  },
});

export const { toggleAssetType, setNetwork, signIn } = walletSlice.actions;

export default walletSlice.reducer;
