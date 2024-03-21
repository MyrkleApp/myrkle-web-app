import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IAddressBookItem,
  ISignIn,
  IWalletAddress,
  IWalletInitialState,
  TNetwork,
  TWalletProvider,
} from "../types";

const initialState: IWalletInitialState = {
  assetType: "token",
  network: "testnet",
  address: "",
  isConnected: false,
  userToken: "",
  walletProvider: "",
  myWallets: [],
  totalBalance: "-- --",
  addressBookList: [],
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
      state.myWallets = [...new Set(payload)];

      // const uniqueArray = payload.reduce((acc, obj) => {
      //   const key = obj.address + '|' + obj.walletProvider; // combining key1 and key2 with a separator
      //   if (!acc.has(key)) {
      //     acc.set(key, obj);
      //   }
      //   return acc;
      // }, new Map()).values();

      // const uniqueAddresses = Array.from(uniqueArray) as IWalletAddress[]

      // state.myWallets = uniqueAddresses;
    },
    addWallet(state, { payload }: PayloadAction<IWalletAddress>) {
      const walletIndex = state.myWallets.findIndex(
        (wallet) =>
          wallet.address === payload.address && wallet.walletProvider === payload.walletProvider,
      );
      if (walletIndex === -1) {
        state.myWallets.push(payload);
      }
    },
    removeWallet(state, { payload }: PayloadAction<IWalletAddress>) {
      const myWallets = [...state.myWallets];
      const walletIndex = myWallets.findIndex(
        (wallet) =>
          wallet.address === payload.address && wallet.walletProvider === payload.walletProvider,
      );
      myWallets.splice(walletIndex, 1);
      state.myWallets = myWallets;
      if (payload.address === state.address && payload.walletProvider === state.walletProvider) {
        state.address = "";
        state.walletProvider = "";
      }
    },
    setTotalBalance(state, { payload }: PayloadAction<string>) {
      state.totalBalance = payload;
    },
    setAddress(state, { payload }: PayloadAction<string>) {
      state.address = payload;
    },
    setWalletProvider(state, { payload }: PayloadAction<TWalletProvider>) {
      state.walletProvider = payload;
    },
    setAddressBookList(state, { payload }: PayloadAction<IAddressBookItem[]>) {
      state.addressBookList = payload;
    },
    addAddressBookItem(state, { payload }: PayloadAction<IAddressBookItem>) {
      state.addressBookList.push(payload);
    },
    deleteAddressBookItem(state, { payload }: PayloadAction<IAddressBookItem>) {
      let addressBookList = [...state.addressBookList];
      addressBookList = addressBookList.filter(
        (item) => item.name !== payload.name && item.address !== payload.address,
      );
      state.addressBookList = addressBookList;
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
  setAddress,
  setWalletProvider,
  setAddressBookList,
  addAddressBookItem,
  deleteAddressBookItem,
} = walletSlice.actions;

export default walletSlice.reducer;
