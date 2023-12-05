import { MotionBox } from "@/components/motion-elements";
import { Image, Text, VStack, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import errorImage from "@/assets/error.png";
import Button from "@/components/button";

export interface CautionModalProps {
  handleClose: () => void;
  handleProceed: () => void;
}

function CautionModal({ handleClose, handleProceed }: CautionModalProps) {
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="320px"
      w="320px"
      p={4}
      bg="darker"
      borderRadius="30px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <VStack px={6} py={2} mt={1}>
        <Image src={errorImage} />
        <Text textAlign="center" fontSize="sm">
          This is not the conventional method of liquidity. In this case, the liquidity provider
          doesn't earn fees. Rather, they generate an offer on the ledger using the passive flag,
          which functions as liquidity for other offers.
        </Text>
        <Button w="100%" mt={4} onClick={handleProceed}>
          confirm
        </Button>
      </VStack>
    </MotionBox>
  );
}

export default CautionModal;
