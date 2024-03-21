export type TAssetType = "token" | "nft";

export interface IWalletInitialState {
  assetType: TAssetType;
  network: TNetwork;
  address: string;
  isConnected: boolean;
  userToken: string;
  walletProvider: TWalletProvider | "";
  myWallets: IWalletAddress[];
  totalBalance: string;
  addressBookList: IAddressBookItem[];
}

export type TAddTokenModalType = "add-token-form" | "select-token";

export type TAccountType = "xumm" | "crossmark" | "gem-wallet";

export type TNetwork = "mainnet" | "testnet" | "devnet";

export type TAccountInfoModal = "account-info" | "enter-password" | "secrets" | "show-mnemonic";

export type TWalletProvider = "myrkle" | "xumm" | "crossmark" | "gemwallet";

export interface ISignIn {
  address: string;
  network: TNetwork;
  userToken: string;
  walletProvider: TWalletProvider;
}

export interface IWalletAddress {
  // id: number;
  name: string;
  address: string;
  walletProvider: TWalletProvider;
}

export interface IAddressBookItem {
  name: string;
  address: string;
}
