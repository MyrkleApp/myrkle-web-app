import { Flex } from "@chakra-ui/react";
import TokenCard from "./token-card";
import { useGetAccountTokensQuery, useGetBalanceQuery } from "@/features/shared/redux/xrp.api";
import { selectAddress, selectNet } from "../../redux/wallet.selectors";
import { useSelector } from "react-redux";
import Skeleton1 from "@/components/skeleton";
import useGetXrpData from "../../hooks/use-get-xrp-data";

function ListTokens() {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const xrpData = useGetXrpData();
  const { isLoading, isFetching, data } = useGetAccountTokensQuery({ address, net });
  const { data: xrpBalanceData } = useGetBalanceQuery({ address, net });

  if (isLoading || isFetching) {
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
      />
      {data?.map((tokenItem: any, i: number) => (
        <TokenCard
          key={i}
          token={tokenItem.token}
          issuer={tokenItem.issuer}
          limit={tokenItem?.limit}
          isFrozen={!!tokenItem?.freeze_status}
          xrpData={xrpData}
          amount={Number(tokenItem.amount)}
        />
      ))}
    </Flex>
  );
}

export default ListTokens;
