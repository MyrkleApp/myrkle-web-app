import Skeleton1 from "@/components/skeleton";
import { useGetOrderBookLiquidityQuery } from "@/features/shared/redux/xrp.api";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function ListPendingLiquidity() {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { isLoading } = useGetOrderBookLiquidityQuery({ address, net });

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

  return (
    <Box h="100%" w="100%" pr={2} overflow="auto">
      {/* {data?.map((offer: any, i: number) => <PendingOfferRow key={i} offer={offer} />)} */}
    </Box>
  );

  return <Box h="100%" w="100%" pr={2} overflow="auto"></Box>;
}

export default ListPendingLiquidity;
