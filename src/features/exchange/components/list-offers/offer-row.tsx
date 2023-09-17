import { Circle, Flex, useDisclosure } from "@chakra-ui/react";
import OfferBox from "./offer-box";
import ExchangeIcon from "@/icons/exchange";
import Backdrop from "@/components/backdrop";
import OfferModal from "../offer-modal";

function OfferRow() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        h="calc(50% - 10px)"
        maxH="110px"
        bg="secondary"
        borderRadius="12px"
        p={3}
        mb="10px"
        gap="7px"
        pos="relative"
        cursor="pointer"
        onClick={onOpen}
      >
        <OfferBox />
        <Circle
          bg="red"
          size="20px"
          cursor="pointer"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <ExchangeIcon stroke="gray" fill="none" />
        </Circle>

        <OfferBox />
      </Flex>
      <Backdrop isOpen={isOpen}>
        <OfferModal handleClose={onClose} />
      </Backdrop>
    </>
  );
}

export default OfferRow;
