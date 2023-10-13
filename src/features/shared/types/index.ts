export type TConnectionStatus = "loading" | "success" | "failed";

export interface IToken {
  token: string;
  issuer: string;
  icon: string;
}
