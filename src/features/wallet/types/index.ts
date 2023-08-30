export type TAssetType = "token" | "nft";

export interface IWalletInitialState {
  assetType: TAssetType;
}

export type TAddTokenModalType = "add-token-form" | "select-token";
