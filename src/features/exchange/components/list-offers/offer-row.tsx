import { Flex } from "@chakra-ui/react";
import OfferBox from "./offer-box";

function OfferRow() {
  return (
    <Flex
      h="calc(50% - 10px)"
      maxH="110px"
      bg="secondary"
      borderRadius="12px"
      p={3}
      mb="10px"
      gap="7px"
    >
      <OfferBox />
      <OfferBox />
    </Flex>
  );
}

export default OfferRow;
