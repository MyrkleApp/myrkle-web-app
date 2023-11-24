import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetTokenInfo } from "../types/token-queries";
import { cleanupTokenList, tokenFormatter } from "@/helpers";
import { xrpToken } from "@/constants";
import { Buffer } from "buffer";

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

export const tokenApi = createApi({
  reducerPath: "tokenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getTokenInfo: builder.query({
      query: ({ token, issuer }: IGetTokenInfo) =>
        `https://s1.xrplmeta.org/token/${token}:${issuer}?include_changes=true`,
      transformResponse: (res: any) => {
        return {
          name: res.currency,
          issuer: res.issuer,
          issuerName: res.meta.issuer.name,
          issuerIcon: res.meta.issuer.icon,
          domain: tokenFormatter(res.meta.issuer.domain),
          icon: res.meta.token.icon,
          description: res.meta.token.description || "",
          marketCap: Number(res.metrics.marketcap).toFixed(3),
          price: Number(Number(res.metrics.price).toFixed(3)),
          pair: `${
            isHex(res.currency) ? hex2string(res.currency).split("\x00")[0] : res.currency
          }/XRP`,
          percentageChange: res.metrics.changes["24h"].price.percent?.toFixed(2),
          holders: res.metrics.holders,
          trustlines: res.metrics.trustlines,
          supply: Number(res.metrics.supply).toFixed(3),
        };
      },
    }),
    getXrpInfo: builder.query({
      query: () => "https://api.xrpscan.com/api/v1/fact/XRP",
    }),
    getActiveAccount: builder.query({
      query: () => "https://api.xrpscan.com/api/v1/fact/ObjectCount",
    }),
    getFee: builder.query({
      query: () => "https://api.xrpscan.com/api/v1/network/fee",
    }),
    getPrice: builder.query({
      query: () => "https://data.messari.io/api/v1/assets/xrp/metrics",
    }),
    getMainnetTokens: builder.query({
      query: () => "https://s1.xrplmeta.org/tokens?limit=400",
      transformResponse: (res: any) => {
        return [xrpToken, ...cleanupTokenList(res.tokens)];
      },
    }),
  }),
});

export const {
  useGetTokenInfoQuery,
  useLazyGetTokenInfoQuery,
  useGetXrpInfoQuery,
  useGetActiveAccountQuery,
  useGetFeeQuery,
  useGetPriceQuery,
  useGetMainnetTokensQuery,
} = tokenApi;

// {
//   "currency": "BTC",
//   "issuer": "rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL",
//   "meta": {
//     "token": {
//       "asset_class": "cryptocurrency",
//       "icon": "https://static.xrplmeta.org/icons/BTC.png",
//       "name": "Bitcoin",
//       "trust_level": 3
//     },
//     "issuer": {
//       "domain": "gatehub.net",
//       "icon": "https://static.xrplmeta.org/icons/gatehub.png",
//       "kyc": true,
//       "name": "GateHub",
//       "trust_level": 3,
//       "weblinks": [
//         {
//           "url": "https://gatehub.net"
//         },
//         {
//           "url": "https://twitter.com/GateHub",
//           "type": "socialmedia"
//         }
//       ]
//     }
//   },
//   "metrics": {
//     "trustlines": 117463,
//     "holders": 35575,
//     "supply": "476.413830692888",
//     "marketcap": "25324535.8343047",
//     "price": "53156.5924471023",
//     "volume_24h": "12282.430551",
//     "volume_7d": "96109.089465",
//     "exchanges_24h": "26",
//     "exchanges_7d": "162",
//     "takers_24h": "10",
//     "takers_7d": "47",
//     "changes": {
//       "24h": {
//         "trustlines": {
//           "delta": 0,
//           "percent": 0
//         },
//         "holders": {
//           "delta": 2,
//           "percent": 0.00562224158772102
//         },
//         "supply": {
//           "delta": "-1.0872418169396",
//           "percent": -0.22769410992626
//         },
//         "marketcap": {
//           "delta": "99964.33982133",
//           "percent": 0.396297474639726
//         },
//         "price": {
//           "percent": 1.8480384532536
//         }
//       },
//       "7d": {
//         "trustlines": {
//           "delta": 23,
//           "percent": 0.0195844686648501
//         },
//         "holders": {
//           "delta": 4,
//           "percent": 0.0112451154029968
//         },
//         "supply": {
//           "delta": "-1.78694631184",
//           "percent": -0.373681181162599
//         },
//         "marketcap": {
//           "delta": "1474167.74647889",
//           "percent": 6.18090144793767
//         },
//         "price": {
//           "percent": 6.57916774082488
//         }
//       }
//     }
//   }
// }
