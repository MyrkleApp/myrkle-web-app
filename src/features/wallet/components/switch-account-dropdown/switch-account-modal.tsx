import Button from "@/components/button";
import { MotionBox } from "@/components/motion-elements";
import { HStack, Spacer, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";

export interface AddressModalProps {
  address: string;
  provider: string;
  handleClose: () => void;
  handleProceed: () => void;
  isWalletInStorage: boolean;
}

function SwitchAccountModal({
  address,
  provider,
  handleClose,
  handleProceed,
  isWalletInStorage,
}: AddressModalProps) {
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
      h="250px"
      w="250px"
      p={6}
      bg="darker"
      borderRadius="30px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Text fontSize="sm" mb={1}>
        You are about to switch your active account to:{" "}
      </Text>
      <Text fontSize="sm" fontWeight="bold" mb={2}>
        {address}
      </Text>
      <Text fontSize="sm" mb={6}>
        {isWalletInStorage
          ? `that exists on your ${provider} account`
          : "which you have not connected to"}
      </Text>

      <HStack>
        <Spacer />
        <Button h="35px" bg="danger" onClick={handleClose}>
          Cancel
        </Button>
        <Button h="35px" onClick={handleProceed}>
          {isWalletInStorage ? "Proceed" : "Connect"}
        </Button>
      </HStack>
    </MotionBox>
  );
}

export default SwitchAccountModal;
