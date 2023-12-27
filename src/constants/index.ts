import xrpLogo from "@/assets/xrp-logo.svg";

// main api endpoint
export const baseUrl = "https://myrkle-django.onrender.com";

export const numbersOnlyRegex = /^(?:\d+(?:\.\d*)?|\.\d+)?$/;
export const xrpIssuer = Array(27).fill("0").join("");
export const xrpToken = { token: "xrp", issuer: xrpIssuer, icon: xrpLogo };
export const today = new Date().toISOString().split("T")[0];
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
