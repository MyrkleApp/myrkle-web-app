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
  if (!text.includes("https://")) {
    return `https://${text}`;
  }
  return text;
};

export const isPositiveChange = (change: string) => Number(change) > 0;
