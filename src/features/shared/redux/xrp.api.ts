import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAccountSetIssuer,
  IAccountSetManager,
  IAddToken,
  IAuthNftTokenMinter,
  IBurnNft,
  IBurnToken,
  ICancelCheck,
  ICancelOffer,
  ICashTokenCheck,
  ICashXrpCheck,
  ICreateNotification,
  ICreatePairingToken,
  ICreateSellOffer,
  ICreateToken,
  ICreateTokenCheck,
  ICreateTrustline,
  ICreateXrpCheck,
  ICreateXrpEscrow,
  IFlag,
  IMintNft,
  IModifyDomain,
  IModifyEmail,
  IModifyTickSize,
  IModifyTokenTransferFee,
  IOrderBookLiquidity,
  IOrderBookSwap,
  IReceiveNft,
  IRemoveToken,
  ISendNft,
  ISendToken,
  ISendXrp,
  ISortBestOffer,
  IToggleTokenFreeze,
} from "../types/xrp-mutations";
import { IAddressNet, IGetAccountTokenInfo, IIdNet } from "../types/xrp-queries";
import { nftFormatter } from "@/helpers";

const cloudServer = "https://myrkle-django.onrender.com/api/v1/";

export const xrpApi = createApi({
  reducerPath: "xrpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: cloudServer,
    // prepareHeaders: (headers, { getState }: any) => {
    //   const token = getState().auth.token;
    //   headers.set("Authorization", `Bearer ${token}`);
    // },
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: ({ address, net }: IAddressNet) => `get-balance/${address}/?${net}`,
    }),
    getAccountTokens: builder.query({
      query: ({ address, net }: IAddressNet) => `get-account-tokens/${address}/?${net}`,
    }),
    getAccountTokenInfo: builder.query({
      query: ({ issuer, net }: IGetAccountTokenInfo) =>
        `info/get_token_info?${net}&issuer=${issuer}`,
    }),
    getAccountNfts: builder.query({
      query: ({ address, net }: IAddressNet) => `get-account-nfts/${address}/?${net}`,
    }),
    getNftInfo: builder.query({
      query: ({ id, net }: IIdNet) => `info/get-nft-info/?nft_id=${id}&${net}`,
    }),
    getNftMetaData2: builder.query({
      query: (url: string) => nftFormatter(url),
      transformResponse: (res: any) => {
        return { ...res, image: nftFormatter(res.image) };
      },
    }),
    getNetworkFee: builder.query({
      query: ({ address, net }: IAddressNet) => `get-network-fee/${address}/?${net}`,
    }),
    getPaymentTransactions: builder.query({
      query: ({ address, net }: IAddressNet) => `get-payment-transactions/${address}/?${net}`,
    }),
    getTokenTransactions: builder.query({
      query: ({ address, net }: IAddressNet) => `get-token-transactions/${address}/?${net}`,
    }),
    getXrpTransactions: builder.query({
      query: ({ address, net }: IAddressNet) => `get-xrp-transactions/${address}/?${net}`,
    }),
    getAccountInfo: builder.query({
      query: ({ address, net }: IAddressNet) => `info/get-account-info/${address}/?${net}`,
    }),
    getAccountChecks: builder.query({
      query: ({ address, net }: IAddressNet) => `object/account-checks/${address}/?${net}`,
    }),
    getCheckInfo: builder.query({
      query: ({ id, net }: IIdNet) => `info/get-check-info/?check_id=${id}&${net}`,
    }),
    getAccountEscrows: builder.query({
      query: ({ address, net }: IAddressNet) => `object/account-xrp-escrow/${address}/?${net}`,
    }),
    getEscrowInfo: builder.query({
      query: ({ id, net }: IIdNet) => `info/get-xrp-escrow-info/?escrow_id=${id}&${net}`,
    }),
    getPayTxnInfo: builder.query({
      query: ({ id, net }: IIdNet) => `info/pay-txn-info/?txid=${id}&${net}`,
    }),
    getTxnStatus: builder.query({
      query: ({ id, net }: IIdNet) => `info/txn-status/?txid=${id}&${net}`,
    }),
    getAllNftOffers: builder.query({
      query: ({ id, net }: IIdNet) => `nft/all-nft-offers/?nft_token_id=${id}&${net}`,
    }),
    getNftOfferInfo: builder.query({
      query: ({ id, net }: IIdNet) => `info/get-nft-offer-info/?offer_id=${id}&${net}`,
    }),
    getAccountNftOffers: builder.query({
      query: ({ address, net }: IAddressNet) => `nft/account-nft-offers/${address}/?${net}`,
    }),
    getPendingOffers: builder.query({
      query: ({ address, net }: IAddressNet) => `xamm/pending-offers/${address}/?${net}`,
    }),
    getOrderBookLiquidity: builder.query({
      query: ({ address, net }: IAddressNet) =>
        `exchange/get-orderbook-liquidity/${address}/?${net}`,
    }),
    parsePayTxnFlag: builder.query({
      query: (flag: string) => `misc/parse-pay-txn-flags/?pay_flag=${flag}`,
    }),
    parseNftFlag: builder.query({
      query: (flag: string) => `misc/parse-nft-flags/?nft_flag=${flag}`,
    }),
    generateConditionFulfillment: builder.query({
      query: () => `misc/generate-condition-fulfillment/`,
    }),

    // =================================================================================================
    // mutations
    // =================================================================================================
    burnToken: builder.mutation({
      query(body: IBurnToken) {
        return {
          url: "burn-token/",
          method: "POST",
          body,
        };
      },
    }),
    burnNft: builder.mutation({
      query(body: IBurnNft) {
        return {
          url: "burn-nft/",
          method: "POST",
          body,
        };
      },
    }),
    toggleTokenFreeze: builder.mutation({
      query(body: IToggleTokenFreeze) {
        return {
          url: "eng/modify-token-freeze-state/",
          method: "POST",
          body,
        };
      },
    }),
    addToken: builder.mutation({
      query(body: IAddToken) {
        return {
          url: "eng/add-token/",
          method: "POST",
          body,
        };
      },
    }),
    removeToken: builder.mutation({
      query(body: IRemoveToken) {
        return {
          url: "eng/remove-token/",
          method: "POST",
          body,
        };
      },
    }),
    createSellOffer: builder.mutation({
      query(body: ICreateSellOffer) {
        return {
          url: "nft/create-sell-offer/",
          method: "POST",
          body,
        };
      },
    }),
    sendNft: builder.mutation({
      query(body: ISendNft) {
        return {
          url: "send-nft/",
          method: "POST",
          body,
        };
      },
    }),
    sendToken: builder.mutation({
      query(body: ISendToken) {
        return {
          url: "send-token/",
          method: "POST",
          body,
        };
      },
    }),
    sendXrp: builder.mutation({
      query(body: ISendXrp) {
        return {
          url: "send-xrp/",
          method: "POST",
          body,
        };
      },
    }),
    mintNft: builder.mutation({
      query(body: IMintNft) {
        return {
          url: "mint-nft/",
          method: "POST",
          body,
        };
      },
    }),
    receiveNft: builder.mutation({
      query(body: IReceiveNft) {
        return {
          url: "receive-nft/",
          method: "POST",
          body,
        };
      },
    }),
    createTokenCheck: builder.mutation({
      query(body: ICreateTokenCheck) {
        return {
          url: "object/create-token-check/",
          method: "POST",
          body,
        };
      },
    }),
    createXrpCheck: builder.mutation({
      query(body: ICreateXrpCheck) {
        return {
          url: "object/create-xrp-check/",
          method: "POST",
          body,
        };
      },
    }),
    cashXrpCheck: builder.mutation({
      query(body: ICashXrpCheck) {
        return {
          url: "object/cash-xrp-check/",
          method: "POST",
          body,
        };
      },
    }),
    cashTokenCheck: builder.mutation({
      query(body: ICashTokenCheck) {
        return {
          url: "object/cash-token-check/",
          method: "POST",
          body,
        };
      },
    }),
    cancelCheck: builder.mutation({
      query(body: ICancelCheck) {
        return {
          url: "object/cancel-check/",
          method: "POST",
          body,
        };
      },
    }),

    createXrpEscrow: builder.mutation({
      query(body: ICreateXrpEscrow) {
        return {
          url: "object/create-xrp-escrow",
          method: "POST",
          body,
        };
      },
    }),
    modifyDomain: builder.mutation({
      query(body: IModifyDomain) {
        return {
          url: "eng/modify-domain/",
          method: "POST",
          body,
        };
      },
    }),
    modifyEmail: builder.mutation({
      query(body: IModifyEmail) {
        return {
          url: "eng/modify-email/",
          method: "POST",
          body,
        };
      },
    }),
    modifyTokenTransferFee: builder.mutation({
      query(body: IModifyTokenTransferFee) {
        return {
          url: "eng/modify-token-transfer-fee/",
          method: "POST",
          body,
        };
      },
    }),
    modifyTickSize: builder.mutation({
      query(body: IModifyTickSize) {
        return {
          url: "eng/modify-ticksize/",
          method: "POST",
          body,
        };
      },
    }),
    orderBookSwap: builder.mutation({
      query(body: IOrderBookSwap) {
        return {
          url: "exchange/order-book-swap/",
          method: "POST",
          body,
        };
      },
    }),
    orderBookLiquidity: builder.mutation({
      query(body: IOrderBookLiquidity) {
        return {
          url: "exchange/create-orderbook-liquidity/",
          method: "POST",
          body,
        };
      },
    }),
    createToken: builder.mutation({
      query(body: ICreateToken) {
        return {
          url: "create-token/",
          method: "POST",
          body,
        };
      },
    }),
    sortBestOffer: builder.mutation({
      query(body: ISortBestOffer) {
        return {
          url: "exchange/sort-best-offer/",
          method: "POST",
          body,
        };
      },
    }),
    cancelOffer: builder.mutation({
      query(body: ICancelOffer) {
        return {
          url: "exchange/cancel-offer/",
          method: "POST",
          body,
        };
      },
    }),
    generateXAddress: builder.mutation({
      query(body) {
        return {
          url: "misc/generate-x-address/",
          method: "POST",
          body,
        };
      },
    }),
    cancelXrpEscrow: builder.mutation({
      query(body) {
        return {
          url: "object/cancel-xrp-escrow/",
          method: "POST",
          body,
        };
      },
    }),
    finishXrpEscrow: builder.mutation({
      query(body) {
        return {
          url: "object/finish-xrp-escrow/",
          method: "POST",
          body,
        };
      },
    }),

    // =========================================
    // flags
    // =========================================
    accountTxnId: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-account-txn-id/",
          method: "POST",
          body,
        };
      },
    }),
    authNftTokenMinter: builder.mutation({
      query(body: IAuthNftTokenMinter) {
        return {
          url: "eng/asf-authorized-nft-token-minter/",
          method: "POST",
          body,
        };
      },
    }),
    defaultRipple: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-default-ripple/",
          method: "POST",
          body,
        };
      },
    }),
    disableMaster: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-disable-master/",
          method: "POST",
          body,
        };
      },
    }),
    disallowIncomingCheck: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-disallow-incoming-check/",
          method: "POST",
          body,
        };
      },
    }),
    disallowIncomingNftTokenOffer: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-disallow-incoming-nft-token-offer/",
          method: "POST",
          body,
        };
      },
    }),
    disallowIncomingPayChan: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-disallow-incoming-payChan/",
          method: "POST",
          body,
        };
      },
    }),
    disallowIncomingTrustline: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-disallow-incoming-trustline/",
          method: "POST",
          body,
        };
      },
    }),
    disallowXrp: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-disallow-xrp/",
          method: "POST",
          body,
        };
      },
    }),
    globalFreeze: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-global-freeze/",
          method: "POST",
          body,
        };
      },
    }),
    noFreeze: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-no-freeze/",
          method: "POST",
          body,
        };
      },
    }),
    requireAuth: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-require-auth/",
          method: "POST",
          body,
        };
      },
    }),
    requireDest: builder.mutation({
      query(body: IFlag) {
        return {
          url: "eng/asf-require-dest/",
          method: "POST",
          body,
        };
      },
    }),

    // =========================================
    // new
    // =========================================
    accountSetIssuer: builder.mutation({
      query(body: IAccountSetIssuer) {
        return {
          url: "account-set-issuer/",
          method: "POST",
          body,
        };
      },
    }),
    accountSetManager: builder.mutation({
      query(body: IAccountSetManager) {
        return {
          url: "account-set-manager/",
          method: "POST",
          body,
        };
      },
    }),
    createNotification: builder.mutation({
      query(body: ICreateNotification) {
        return {
          url: "create-notification/",
          method: "POST",
          body,
        };
      },
    }),
    createPairingToken: builder.mutation({
      query(body: ICreatePairingToken) {
        return {
          url: "create-pairing-token/",
          method: "POST",
          body,
        };
      },
    }),

    createTrustline: builder.mutation({
      query(body: ICreateTrustline) {
        return {
          url: "create-trustline/",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  // queries
  useGetBalanceQuery,
  useLazyGetBalanceQuery,
  useGetAccountTokensQuery,
  useLazyGetAccountTokensQuery,
  useGetAccountTokenInfoQuery,
  useGetAccountNftsQuery,
  useLazyGetAccountNftsQuery,
  useGetNftInfoQuery,
  useLazyGetNftInfoQuery,
  useGetNftMetaData2Query,
  useLazyGetNftMetaData2Query,
  useGetNftOfferInfoQuery,
  useLazyGetNftOfferInfoQuery,
  useGetNetworkFeeQuery,
  useGetPaymentTransactionsQuery,
  useLazyGetPaymentTransactionsQuery,
  useGetTokenTransactionsQuery,
  useGetXrpTransactionsQuery,
  useGetAccountInfoQuery,
  useLazyGetAccountInfoQuery,
  useGetAccountChecksQuery,
  useLazyGetAccountChecksQuery,
  useGetCheckInfoQuery,
  useGetAccountEscrowsQuery,
  useLazyGetAccountEscrowsQuery,
  useGetEscrowInfoQuery,
  useGetPayTxnInfoQuery,
  useGetAllNftOffersQuery,
  useGetAccountNftOffersQuery,
  useGetPendingOffersQuery,
  useLazyGetPendingOffersQuery,
  useLazyParsePayTxnFlagQuery,
  useLazyGetTxnStatusQuery,
  useParseNftFlagQuery,
  useGetOrderBookLiquidityQuery,
  useLazyGetOrderBookLiquidityQuery,
  useLazyGenerateConditionFulfillmentQuery,

  // mutations
  useBurnTokenMutation,
  useBurnNftMutation,
  useToggleTokenFreezeMutation,
  useAddTokenMutation,
  useRemoveTokenMutation,
  useCreateSellOfferMutation,
  useSendNftMutation,
  useSendTokenMutation,
  useSendXrpMutation,
  useMintNftMutation,
  useReceiveNftMutation,
  useCreateTokenCheckMutation,
  useCreateXrpCheckMutation,
  useCashXrpCheckMutation,
  useCashTokenCheckMutation,
  useCancelCheckMutation,
  useCreateXrpEscrowMutation,
  useModifyDomainMutation,
  useModifyEmailMutation,
  useModifyTokenTransferFeeMutation,
  useModifyTickSizeMutation,
  useOrderBookSwapMutation,
  useOrderBookLiquidityMutation,
  useCreateTokenMutation,
  useSortBestOfferMutation,
  useCancelOfferMutation,
  useGenerateXAddressMutation,
  useCancelXrpEscrowMutation,
  useFinishXrpEscrowMutation,
  //flags
  useAccountTxnIdMutation,
  useAuthNftTokenMinterMutation,
  useDefaultRippleMutation,
  useDisableMasterMutation,
  useDisallowIncomingCheckMutation,
  useDisallowIncomingNftTokenOfferMutation,
  useDisallowIncomingPayChanMutation,
  useDisallowIncomingTrustlineMutation,
  useDisallowXrpMutation,
  useGlobalFreezeMutation,
  useNoFreezeMutation,
  useRequireAuthMutation,
  useRequireDestMutation,

  useAccountSetIssuerMutation,
  useAccountSetManagerMutation,
  useCreateNotificationMutation,
  useCreatePairingTokenMutation,
  useCreateTrustlineMutation,
} = xrpApi;
