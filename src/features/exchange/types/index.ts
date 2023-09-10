export type TExchangeType = "swap" | "liquidity";

export interface IExchangeInitialState {
  exchangeType: TExchangeType;
}
