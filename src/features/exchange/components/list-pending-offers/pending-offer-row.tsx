import { Circle, Flex } from "@chakra-ui/react";
import PendingOfferBox from "./pending-offer-box";
import ExchangeIcon from "@/icons/exchange";

function PendingOfferRow() {
  return (
    <Flex
      h="65px"
      bg="secondary"
      borderRadius="7px"
      p={1}
      mb="10px"
      gap="30px"
      pos="relative"
      cursor="pointer"
    >
      <PendingOfferBox />
      <Circle
        bg="darkest"
        size="20px"
        cursor="pointer"
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <ExchangeIcon stroke="gray" fill="none" />
      </Circle>
      <PendingOfferBox />
    </Flex>
  );
}

export default PendingOfferRow;
