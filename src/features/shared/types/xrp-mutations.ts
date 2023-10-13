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

export interface ICreateXrpEscrow {
  sender_addr: string;
  receiver_addr: string;
  amount: number | string;
  condition: string;
  claim_date: string;
  expiry_date: string;
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

export interface ICreateTrustline {
  manager_addr: string;
  issuer_addr: string;
  token_name: string;
  total_supply: string;
}

export interface IReceiveNft {
  sender_addr: string;
  nft_sell_id: string;
}

export interface ISendNft {
  sender_addr: string;
  nftoken_id: string;
  receiver_addr: string;
}

export interface ISendToken {
  sender_addr: string;
  receiver_addr: string;
  token: string;
  issuer: string;
  amount: number;
}

export interface ISendXrp {
  sender_addr: string;
  receiver_addr: string;
  amount: number;
}
