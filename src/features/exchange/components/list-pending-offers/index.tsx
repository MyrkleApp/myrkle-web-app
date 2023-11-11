import { Box } from "@chakra-ui/react";
import PendingOfferRow from "./pending-offer-row";
import { useGetPendingOffersQuery } from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import Skeleton1 from "@/components/skeleton";

function ListPendingOffers() {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { data, isLoading } = useGetPendingOffersQuery({ address, net });

  if (isLoading) {
    return (
      <Box h="calc(100% - 40px)" mt="10px" w="100%" pr={2} overflow="auto">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Skeleton1 key={i} h="65px" borderRadius="0" mb={2} />
          ))}
      </Box>
    );
  }

  return (
    <Box h="calc(100% - 40px)" mt="10px" w="100%" pr={2} overflow="auto">
      {data?.map((offer: any, i: number) => <PendingOfferRow key={i} offer={offer} />)}
    </Box>
  );
}

export default ListPendingOffers;
