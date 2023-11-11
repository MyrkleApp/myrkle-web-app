import Skeleton1 from "@/components/skeleton";
import { useGetOrderBookLiquidityQuery } from "@/features/shared/redux/xrp.api";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PendingLiquidityRow from "./pending-liquidity-row";

function ListPendingLiquidity() {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { data, isLoading } = useGetOrderBookLiquidityQuery({ address, net });

  if (isLoading) {
    return (
      <Box h="100%" w="100%" pr={2} overflow="auto">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Skeleton1 key={i} h="85px" borderRadius="0" mb={2} />
          ))}
      </Box>
    );
  }

  if (!data?.length) {
    return (
      <Flex h="100%" justify="center" align="center">
        <Text fontSize="lg" fontWeight="bold">
          No data to display
        </Text>
      </Flex>
    );
  }

  return (
    <Box h="100%" w="100%" pr={2} overflow="auto">
      {data?.map((offer: any, i: number) => <PendingLiquidityRow key={i} offer={offer} />)}
    </Box>
  );

  return <Box h="100%" w="100%" pr={2} overflow="auto"></Box>;
}

export default ListPendingLiquidity;
