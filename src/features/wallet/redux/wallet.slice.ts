import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISignIn, IWalletAddress, IWalletInitialState, TNetwork } from "../types";

const initialState: IWalletInitialState = {
  assetType: "token",
  network: "testnet",
  address: "",
  isConnected: false,
  userToken: "",
  walletProvider: "",
  myWallets: [],
  totalBalance: 0,
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
    setMyWallets(state, { payload }: PayloadAction<IWalletAddress[]>) {
      state.myWallets = payload;
    },
    addWallet(state, { payload }: PayloadAction<IWalletAddress>) {
      state.myWallets.push(payload);
    },
    removeWallet(state, { payload }: PayloadAction<IWalletAddress>) {
      const myWallets = [...state.myWallets];
      const walletIndex = myWallets.findIndex(
        (wallet) =>
          wallet.address === payload.address && wallet.walletProvider === payload.walletProvider,
      );
      myWallets.splice(walletIndex, 1);
      state.myWallets = myWallets;
    },
    setTotalBalance(state, { payload }: PayloadAction<number>) {
      state.totalBalance = payload;
    },
  },
});

export const {
  toggleAssetType,
  setNetwork,
  signIn,
  setMyWallets,
  addWallet,
  removeWallet,
  setTotalBalance,
} = walletSlice.actions;

export default walletSlice.reducer;
