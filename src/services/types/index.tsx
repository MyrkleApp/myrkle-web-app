import { TWalletProvider } from "@/features/wallet/types";

export interface IAddExternalWallet {
  address: string;
  walletProvider: Exclude<TWalletProvider, "myrkle">;
}
