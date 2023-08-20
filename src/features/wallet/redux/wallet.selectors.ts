import { RootState } from "@/store";

export const selectAssetType = (state: RootState) => state.wallet.assetType;
