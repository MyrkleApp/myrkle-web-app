export type TAssetType = "token" | "nft";

export interface IWalletInitialState {
  assetType: TAssetType;
  network: TNetwork;
}

export type TAddTokenModalType = "add-token-form" | "select-token";

export type TAccountType = "xumm" | "crossmark" | "gem-wallet";

export type TNetwork = "mainnet" | "testnet" | "devnet";

export type TAccountInfoModal = "account-info" | "enter-password" | "secrets" | "show-mnemonic";
