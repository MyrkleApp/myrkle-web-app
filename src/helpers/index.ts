import { Buffer } from "buffer";

export const ellipsisAtCenter = (text: string) => {
  if (text.length < 10) return text;
  return `${text.slice(0, 5)} ... ${text.slice(-5)}`;
};

export const isXrpToken = (tokenObj: any) => {
  if (tokenObj?.token.toLowerCase() === "xrp") {
    return true;
  } else {
    return false;
  }
};

export const nftFormatter = (text: string) => {
  if (text.includes("ipfs://")) {
    return text.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  if (!text.includes("ipfs://") && !text.includes("https://ipfs.io/ipfs/")) {
    return `https://ipfs.io/ipfs/${text}`;
  }
  return text;
};

export const tokenFormatter = (text: string) => {
  if (!text?.includes("https://")) {
    return `https://${text}`;
  }
  return text;
};

export const isPositiveChange = (change: string) => Number(change) > 0;

export const hex2string = (input: any) => {
  const output = Buffer.from(input, "hex").toString("utf-8");
  return output;
};

export const isHex = (val: any) => {
  const regex = /[0-9A-Fa-f]{6}/g;
  if (val.match(regex)) {
    return true;
  } else {
    return false;
  }
};

export const cleanupTokenList = (tokenList: any) => {
  const mainnetList = [];

  for (const token of tokenList) {
    const tokenName = isHex(token.currency)
      ? hex2string(token.currency).split("\x00")[0]
      : token.currency;
    const issuer = token.issuer;
    const icon = token.meta.token.icon;
    mainnetList.push({ token: tokenName, issuer, icon });
  }

  return mainnetList;
};
