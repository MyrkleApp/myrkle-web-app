import { RootState } from "@/store";

export const selectAssetType = (state: RootState) => state.wallet.assetType;
export const selectNetwork = (state: RootState) => state.wallet.network;
