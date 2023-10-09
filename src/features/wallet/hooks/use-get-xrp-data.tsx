import {
  useGetActiveAccountQuery,
  useGetFeeQuery,
  useGetPriceQuery,
  useGetXrpInfoQuery,
} from "@/features/shared/redux/token.api";

function useGetXrpData() {
  const { data: xrpInfo, isLoading: isXrpInfoLoading } = useGetXrpInfoQuery({});
  const { data: activeAccount, isLoading: isActiveAccountLoading } = useGetActiveAccountQuery({});
  const { data: fee, isLoading: isFeeLoading } = useGetFeeQuery({});
  const { data: price, isLoading: isPriceLoading } = useGetPriceQuery({});

  const divider = 1000000;

  return {
    holders: {
      isLoading: isActiveAccountLoading,
      data: activeAccount?.AccountRoot,
    },
    fee: {
      isLoading: isFeeLoading,
      data: fee?.drops.base_fee / divider,
    },
    tick: 6,
    price: {
      isLoading: isPriceLoading,
      data: price?.data.market_data.price_usd.toFixed(3),
    },
    pair: "XRP/USD",
    percentageChange: {
      isLoading: isPriceLoading,
      data: price?.data.market_data.percent_change_usd_last_24_hours.toFixed(2),
    },
    marketCap: {
      isLoading: isPriceLoading,
      data: Math.round(price?.data.marketcap.current_marketcap_usd),
    },
    marketDominance: {
      isLoading: isPriceLoading,
      data: price?.data.marketcap.marketcap_dominance_percent.toFixed(2),
    },
    maxSupply: {
      isLoading: isXrpInfoLoading,
      data: (xrpInfo?.max_supply / divider).toFixed(3),
    },
    burnedCoins: {
      isLoading: isXrpInfoLoading,
      data: (xrpInfo?.burned_coins / divider).toFixed(3),
    },
    circulatingSupply: {
      isLoading: isXrpInfoLoading,
      data: (xrpInfo?.circulating_coins / divider).toFixed(3),
    },
    escrowedCoins: {
      isLoading: isXrpInfoLoading,
      data: (xrpInfo?.escrowed_coins / divider).toFixed(3),
    },
    totalCoins: {
      isLoading: isXrpInfoLoading,
      data: (xrpInfo?.total_coins / divider).toFixed(3),
    },
  } as const;
}

export default useGetXrpData;
