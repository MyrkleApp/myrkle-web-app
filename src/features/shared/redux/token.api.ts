import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetTokenInfo } from "../types/token-queries";
import { cleanupTokenList, nftFormatter, tokenFormatter } from "@/helpers";
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

    // =============================================================================
    // nft
    // =============================================================================

    getNftMetaData2: builder.query({
      query: (url: string) => nftFormatter(url),
      transformResponse: (res: any) => {
        return { ...res, image: nftFormatter(res.image) };
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
  useGetNftMetaData2Query,
  useLazyGetNftMetaData2Query,
} = tokenApi;
