export interface IAttribute {
  trait_type: string;
  value: string;
}

export type TSelectTokenAmountModalState =
  | "select-token"
  | "proceed"
  | "loading"
  | "error-1"
  | "xumm-qr-code"
  | "error-2"
  | "success";

export type TMintTokenStep = "form" | "manager" | "trustline" | "create-token";
