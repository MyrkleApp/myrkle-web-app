import { IToken } from "@/features/shared/types";

export type TExchangeType = "swap" | "liquidity";

export interface IExchangeInitialState {
  exchangeType: TExchangeType;
  fromToken: IToken;
  toToken: IToken;
  tfSell: boolean;
  tfImmediateOrCancel: boolean;
  tfFillOrKill: boolean;
}
