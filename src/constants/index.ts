import xrpLogo from "@/assets/xrp-logo.svg";

export const numbersOnlyRegex = /^(?:\d+(?:\.\d*)?|\.\d+)?$/;
export const xrpIssuer = Array(27).fill("0").join("");
export const xrpToken = { token: "xrp", issuer: xrpIssuer, icon: xrpLogo };
export const today = new Date().toISOString().split("T")[0];
