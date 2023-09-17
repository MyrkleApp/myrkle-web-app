import { Circle, Flex, useDisclosure } from "@chakra-ui/react";
import PendingOfferBox from "./pending-offer-box";
import ExchangeIcon from "@/icons/exchange";
import Backdrop from "@/components/backdrop";
import OfferModal from "../offer-modal";

function PendingOfferRow() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        h="65px"
        bg="secondary"
        borderRadius="7px"
        p={1}
        mb="10px"
        gap="30px"
        pos="relative"
        cursor="pointer"
        onClick={onOpen}
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
      <Backdrop isOpen={isOpen}>
        <OfferModal handleClose={onClose} />
      </Backdrop>
    </>
  );
}

export default PendingOfferRow;
