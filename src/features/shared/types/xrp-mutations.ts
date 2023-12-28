// export interface ISendXrp {
//   sender_address: string;
//   receiver_address: string;
//   amount: number;
//   destination_tag: number;
//   source_tag: number;
//   fee?: string;
// }

// export interface ISendToken extends ISendXrp {
//   token: string;
//   issuer: string;
//   is_lp_token: boolean;
// }

// export interface ICreateToken {
//   issuer_addr: string;
//   manager_addr: string;
//   token_name: string;
//   total_supply: string;
//   fee?: string;
// }

export interface IBurnToken {
  issuer_addr: string;
  sender_addr: string;
  token: string;
  amount: number | string;
}

export interface IBurnNft {
  sender_addr: string;
  nftoken_id: string;
  holder: string;
}

export interface IToggleTokenFreeze {
  sender_addr: string;
  target_addr: string;
  token_name: string;
  freeze: boolean;
  fee?: string;
}

export interface IAddToken {
  sender_addr: string;
  token: string;
  issuer: string;
  rippling: boolean;
  is_lp_token: boolean;
  fee?: string;
}

export interface IRemoveToken {
  sender_addr: string;
  token: string;
  issuer: string;
  fee?: string;
}

export interface IMintNft {
  issuer_addr: string;
  taxon: string;
  is_transferable: boolean;
  only_xrp: boolean;
  issuer_burn: boolean;
  transfer_fee: string;
  uri: string;
}

export interface ICreateXrpCheck {
  sender_addr: string;
  receiver_addr: string;
  amount: number | string;
  expiry_date: string;
}

export interface ICashXrpCheck {
  sender_addr: string;
  check_id: string;
  amount: number | string;
  fee?: string;
}

export interface ICashTokenCheck {
  sender_addr: string;
  check_id: string;
  token: string;
  amount: number | string;
  issuer: string;
  fee?: string;
}

export interface ICancelCheck {
  sender_addr: string;
  check_id: string;
  fee?: string;
}

export interface ICreateXrpEscrow {
  sender_addr: string;
  receiver_addr: string;
  amount: number | string;
  condition?: string;
  claim_date?: string;
  expiry_date?: string;
}

export interface IModifyDomain {
  sender_addr: string;
  domain: string;
  fee?: string;
}

export interface IModifyEmail {
  sender_addr: string;
  email: string;
  fee?: string;
}

export interface IModifyTokenTransferFee {
  sender_addr: string;
  transfer_fee: number;
  fee?: string;
}

export interface IModifyTickSize {
  sender_addr: string;
  tick_size: string;
  fee?: string;
}

// ========================================================================
// *mutations*
// ========================================================================

export interface ICreateTokenCheck {
  sender_addr: string;
  receiver_addr: string;
  token: string;
  amount: string | number;
  issuer: string;
  expiry_date: string;
}

export interface IAccountSetIssuer {
  issuer_addr: string;
  ticksize: string;
  transferfee: string;
  domain: string;
}

export interface IAccountSetManager {
  manager_addr: string;
  domain: string;
}

export interface ICreateNotification {
  read: boolean;
  sender: number;
  pairing: number;
}

export interface ICreatePairingToken {
  code: string;
  expired_at: string;
  expired: boolean;
  status: string;
  user: number;
}

export interface ICreateToken {
  issuer_addr: string;
  manager_addr: string;
  token_name: string;
  total_supply: string;
}

export interface ISortBestOffer {
  buy_type: string;
  buy_issuer: string;
  sell_type: string;
  sell_issuer: string;
  best_buy: boolean;
  best_sell: boolean;
  mainnet: boolean;
}

export interface ICancelOffer {
  sender_addr: string;
  offer_seq: string | number;
  fee?: string;
}

export interface ICreateTrustline {
  manager_addr: string;
  issuer_addr: string;
  token_name: string;
  total_supply: string;
}

export interface ICreateSellOffer {
  sender_addr: string;
  get_amount: string | number;
  nftoken_id: string;
  expiry_date: string;
  receiver: string;
  get_type: string;
  get_issuer: string;
  fee?: string;
}

export interface IReceiveNft {
  sender_addr: string;
  nft_sell_id: string;
}

export interface ISendNft {
  sender_addr: string;
  nftoken_id: string;
  receiver_addr: string;
  fee?: string;
}

export interface ISendToken {
  sender_addr: string;
  receiver_addr: string;
  token: string;
  issuer: string;
  amount: number | string;
  destination_tag?: number | string;
  memo?: number | string;
}

export interface ISendXrp {
  sender_addr: string;
  receiver_addr: string;
  amount: number | string;
  destination_tag?: number | string;
  memo?: number | string;
}

export interface IOrderBookSwap {
  sender_addr: string;
  buy_type: string;
  sell_type: string;
  buy_amount: number | string;
  sell_amount: number | string;
  buy_issuer: string;
  sell_issuer: string;
  tf_sell: boolean;
  tf_fill_or_kill: boolean;
  tf_immediate_or_cancel: boolean;
}

export interface IOrderBookLiquidity {
  sender_addr: string;
  buy_type: string;
  sell_type: string;
  buy_amount: number | string;
  sell_amount: number | string;
  buy_issuer: string;
  sell_issuer: string;
}

export interface IFlag {
  sender_addr: string;
  state: boolean;
  fee?: string;
}

export interface IAuthNftTokenMinter extends IFlag {
  minter: string;
}

export interface IRecordTransaction {
  wallet: string;
  transaction_hash?: string;
  amount?: number | string;
  transaction_type?: string;
  user: string | number;
}
