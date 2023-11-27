import { IToken } from "@/features/shared/types";
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

export const numberWithCommas = (x: string | number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatNumber = (x: number | string) => {
  if (isNaN(Number(x))) return "-- --";

  if (Number(x) < 1) {
    const firstNonZeroNumberIndex = String(x)
      .split("")
      .findIndex((char) => Number(char) > 0);
    return String(x).slice(0, firstNonZeroNumberIndex + 3);
  }

  return numberWithCommas(Number(x).toFixed(3));
};

export const cleanupRate = (rate: number) => (Number.isFinite(rate) ? rate : 0);

export const filterTokenList = (tokenList: IToken[], name: string, address: string) => {
  if (name && !address) {
    return tokenList.filter((token) => token.token.toLowerCase().includes(name.toLowerCase()));
  }

  if (address && !name) {
    return tokenList.filter((token) => token.issuer.toLowerCase().includes(address.toLowerCase()));
  }

  if (name && address) {
    return tokenList.filter(
      (token) =>
        token.token.toLowerCase().includes(name.toLowerCase()) &&
        token.issuer.toLowerCase().includes(address.toLowerCase()),
    );
  }

  return tokenList;
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) {
    return "-- --";
  }

  const date = new Date(dateStr);
  return (
    date.toLocaleDateString("en-US", { day: "numeric" }) +
    " " +
    date.toLocaleDateString("en-US", { month: "short" }) +
    " " +
    date.toLocaleDateString("en-US", { year: "numeric" })
  ); // 23-Nov-2023
};

export const formatTime = (dateStr: string): string => {
  if (!dateStr) {
    return "-- --";
  }

  const date = new Date(dateStr);

  let hours = date.getHours();
  let minutes: number | string = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour "0" should be "12"
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const isObjectEmpty = (object: any) => Object.keys(object).length === 0;
