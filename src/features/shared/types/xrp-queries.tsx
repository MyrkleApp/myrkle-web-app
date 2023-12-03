export interface IAddressNet {
  address: string;
  net: string;
}

export interface IIdNet {
  id: string | number;
  net: string;
}

export interface IGetAccountTokenInfo {
  issuer: string;
  net: string;
}

export interface ICheckTokenExists {
  net: string;
  name: string;
  issuer: string;
}
