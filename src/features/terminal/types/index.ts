export interface IAttribute {
  trait_type: string;
  value: string;
}

export type TSelectTokenAmountModalState =
  | "select-token"
  | "proceed"
  | "loading"
  | "error-1"
  | "error-2"
  | "success";
