import { tokenFormatter } from "@/helpers";
import axios from "axios";
import { useState } from "react";
import { Buffer } from "buffer";

const formatNumber = (value: any) => {
  const splitValue = String(value).split(".");
  const checker = splitValue[1].substring(0, 3);
  if (checker === "000") {
    return Number(value).toFixed(6);
  } else {
    return Number(value).toFixed(3);
  }
};

const hex2string = (input: any) => {
  const output = Buffer.from(input, "hex").toString("utf-8");
  return output;
};

const isHex = (val: any) => {
  const regex = /[0-9A-Fa-f]{6}/g;

  if (val.match(regex)) {
    return true;
  } else {
    return false;
  }
};

function useGetTokenInfo() {
  const [tokenInfo, setTokenInfo] = useState<any>({});

  async function getTokenInfo(tokenName: string, issuerAdrress: string) {
    try {
      const info = (
        await axios.get(
          `https://s1.xrplmeta.org/token/${tokenName}:${issuerAdrress}?include_changes=true`,
        )
      ).data;
      const multiplier = (await axios.get("https://data.messari.io/api/v1/assets/xrp/metrics")).data
        .data.market_data.price_usd;

      const resp = {
        name: info.currency,
        issuer: info.issuer,
        issuerName: info.meta.issuer.name,
        issuerIcon: info.meta.issuer.icon,
        domain: tokenFormatter(info.meta.issuer.domain),
        icon: info.meta.token.icon,
        description: info.meta.token.description,
        marketCap: formatNumber(Number(info.metrics.marketcap) * multiplier),
        price: formatNumber(info.metrics.price * multiplier),
        pair: `${
          isHex(info.currency) ? hex2string(info.currency).split("\x00")[0] : info.currency
        }/XRP`,
        percentageChange: info.metrics.changes["24h"].price.percent?.toFixed(2),
        holders: info.metrics.holders,
        trustlines: info.metrics.trustlines,
        supply: Number(info.metrics.supply).toFixed(3),
      };
      console.log("new fxn token info response", resp);
      setTokenInfo(resp);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  return [tokenInfo, { getTokenInfo }] as const;
}

export default useGetTokenInfo;
