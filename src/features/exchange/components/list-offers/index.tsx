import { Box } from "@chakra-ui/react";
import OfferRow from "./offer-row";

function ListOffers() {
  return (
    <Box h="100%" w="100%" pr={2} overflow="auto">
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <OfferRow key={i} />
        ))}
    </Box>
  );
}

export default ListOffers;
