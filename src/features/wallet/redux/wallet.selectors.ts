import { RootState } from "@/store";

export const selectAssetType = (state: RootState) => state.wallet.assetType;
export const selectNetwork = (state: RootState) => state.wallet.network;
export const selectAddress = (state: RootState) => state.wallet.address;
export const selectUserToken = (state: RootState) => state.wallet.userToken;
export const selectNet = (state: RootState) => {
  const network = state.wallet.network;
  if (network === "testnet") return "net=test";
  if (network === "devnet") return "net=dev";
  return "";
};
export const selectWalletProvider = (state: RootState) => state.wallet.walletProvider;
export const selectMyWallets = (state: RootState) => state.wallet.myWallets;
export const selectTotalBalance = (state: RootState) => state.wallet.totalBalance;
export const selectAddressBookList = (state: RootState) => state.wallet.addressBookList;
