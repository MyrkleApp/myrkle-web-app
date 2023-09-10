import { Box } from "@chakra-ui/react";
import PendingOfferRow from "./pending-offer-row";

function ListPendingOffers() {
  return (
    <Box h="calc(100% - 40px)" mt="10px" w="100%" pr={2} overflow="auto">
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <PendingOfferRow key={i} />
        ))}
    </Box>
  );
}

export default ListPendingOffers;
