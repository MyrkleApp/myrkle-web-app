import { Flex } from "@chakra-ui/react";
import TokenCard from "./token-card";
import { useGetAccountTokensQuery, useGetBalanceQuery } from "@/features/shared/redux/xrp.api";
import { selectAddress, selectNet } from "../../redux/wallet.selectors";
import { useDispatch, useSelector } from "react-redux";
import Skeleton1 from "@/components/skeleton";
import { useEffect, useState } from "react";
import { setTotalBalance } from "../../redux/wallet.slice";
import useGetXrpData from "../../hooks/use-get-xrp-data";

function ListTokens() {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const dispatch = useDispatch();

  const xrpData = useGetXrpData();
  const { isLoading, data } = useGetAccountTokensQuery({ address, net });
  const { data: xrpBalanceData } = useGetBalanceQuery({ address, net });

  const [tokenUsdAmountObj, setTokenUsdAmountObj] = useState({});

  const handleTokenUsdAmountObj = (data: any) => {
    setTokenUsdAmountObj({ ...tokenUsdAmountObj, ...data });
  };

  useEffect(() => {
    const balanceArray: number[] = Object.values(tokenUsdAmountObj);
    const sum = balanceArray.reduce((acc, val) => acc + val, 0);

    dispatch(setTotalBalance(sum));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tokenUsdAmountObj)]);

  if (isLoading) {
    return (
      <Flex direction="column" h="100%" gap={2} pr={4}>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Skeleton1 key={i} h="calc(100% / 3.25)" borderRadius="0" flexShrink={0} />
          ))}
      </Flex>
    );
  }

  return (
    <Flex direction="column" h="100%" gap={2} pr={4}>
      <TokenCard
        token="xrp"
        issuer={"000000000000000000000000"}
        amount={Number(xrpBalanceData?.balance)}
        xrpData={xrpData}
        handleTokenUsdAmountObj={handleTokenUsdAmountObj}
      />
      {data?.map((tokenItem: any, i: number) => (
        <TokenCard
          key={i}
          token={tokenItem.token}
          issuer={tokenItem.issuer}
          limit={tokenItem?.limit}
          xrpData={xrpData}
          amount={Number(tokenItem.amount)}
          handleTokenUsdAmountObj={handleTokenUsdAmountObj}
        />
      ))}
    </Flex>
  );
}

export default ListTokens;
