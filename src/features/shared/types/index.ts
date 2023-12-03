export type TConnectionStatus = "loading" | "success" | "failed";

export interface IToken {
  token: string;
  issuer: string;
  icon: string;
  balance?: string | number;
}

// *error-1 is used for any error prior to sending the json to the wallet provider
// *error-2 is used for the error message from the WALLET PROVIDER
export type TTxnPipeline =
  | "default"
  | "loading"
  | "error-1"
  | "xumm-qr-code"
  | "error-2"
  | "success";
