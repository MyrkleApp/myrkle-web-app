import { Circle, Flex, useDisclosure } from "@chakra-ui/react";
import OfferBox from "./offer-box";
import ExchangeIcon from "@/icons/exchange";
import Backdrop from "@/components/backdrop";
import TxnDetailsModal from "../txn-details-modal";

export interface OfferRowProps {
  offer: any;
}

function OfferRow({ offer }: OfferRowProps) {
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
        <OfferBox token={offer?.buy_token} issuer={offer?.buy_issuer} amount={offer?.buy_amount} />
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

        <OfferBox
          token={offer?.sell_token}
          issuer={offer?.sell_issuer}
          amount={offer?.sell_amount}
        />
      </Flex>
      <Backdrop isOpen={isOpen}>
        <TxnDetailsModal
          handleClose={onClose}
          fromTokenName={""}
          fromTokenIssuer={""}
          fromTokenIcon={""}
          fromTokenAmount={""}
          toTokenName={""}
          toTokenIssuer={""}
          toTokenIcon={""}
          toTokenAmount={""}
        />
      </Backdrop>
    </>
  );
}

export default OfferRow;
