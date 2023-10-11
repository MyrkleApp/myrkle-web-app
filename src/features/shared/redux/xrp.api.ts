import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAccountSetIssuer,
  IAccountSetManager,
  IAddToken,
  IBurnNft,
  IBurnToken,
  ICreateNotification,
  ICreatePairingToken,
  ICreateToken,
  ICreateTokenCheck,
  ICreateTrustline,
  ICreateXrpCheck,
  ICreateXrpEscrow,
  IMintNft,
  IReceiveNft,
  IRemoveToken,
  ISendNft,
  ISendToken,
  ISendXrp,
  IToggleTokenFreeze,
} from "../types/xrp-mutations";
import { IAddressNet, IIdNet } from "../types/xrp-queries";

const cloudServer = "https://myrkle-django.onrender.com/api/v1/";

const CATEGORY_TYPE = "CATEGORY";
const CATEGORY_ID = "CATEGORY_LIST";

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
    getCategories: builder.query({
      query: () => "category",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }: any) => ({ type: CATEGORY_TYPE, id: _id }) as const),
              { type: CATEGORY_TYPE, id: CATEGORY_ID },
            ]
          : [{ type: CATEGORY_TYPE, id: CATEGORY_ID }],
    }),
    createCategory: builder.mutation<any, any>({
      query(body) {
        return {
          url: "category",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: CATEGORY_TYPE, id: CATEGORY_ID }] as any,
    }),
    /**
     * above are dummy
     */

    getBalance: builder.query({
      query: ({ address, net }: IAddressNet) => `get-balance/${address}/?${net}`,
    }),
    getAccountTokens: builder.query({
      query: ({ address, net }: IAddressNet) => `get-account-tokens/${address}/?${net}`,
    }),
    getAccountNfts: builder.query({
      query: ({ address, net }: IAddressNet) => `get-account-nfts/${address}/?${net}`,
    }),
    getNftMetaData: builder.query({
      query: ({ id, net }: IIdNet) => `info/get-nft-metadata/?nft_id=${id}&${net}`,
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
          url: "eng/modify-token-freeze_state/",
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
          url: "create-xrp-check/",
          method: "POST",
          body,
        };
      },
    }),
    createXrpEscrow: builder.mutation({
      query(body: ICreateXrpEscrow) {
        return {
          url: "object/create-xrp-escrow/",
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
    createToken: builder.mutation({
      query(body: ICreateToken) {
        return {
          url: "create-token/",
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
  useGetAccountTokensQuery,
  useGetAccountNftsQuery,
  useGetNftMetaDataQuery,
  useLazyGetNftMetaDataQuery,
  useGetNetworkFeeQuery,
  useGetPaymentTransactionsQuery,
  useGetTokenTransactionsQuery,
  useGetXrpTransactionsQuery,
  useGetAccountInfoQuery,
  useGetAccountChecksQuery,
  useGetCheckInfoQuery,
  useGetAccountEscrowsQuery,
  useGetEscrowInfoQuery,

  // mutations
  useBurnTokenMutation,
  useBurnNftMutation,
  useToggleTokenFreezeMutation,
  useAddTokenMutation,
  useRemoveTokenMutation,
  useSendNftMutation,
  useSendTokenMutation,
  useSendXrpMutation,
  useMintNftMutation,
  useReceiveNftMutation,
  useCreateTokenCheckMutation,
  useCreateXrpCheckMutation,
  useCreateXrpEscrowMutation,

  useAccountSetIssuerMutation,
  useAccountSetManagerMutation,
  useCreateNotificationMutation,
  useCreatePairingTokenMutation,
  useCreateTokenMutation,
  useCreateTrustlineMutation,
} = xrpApi;
