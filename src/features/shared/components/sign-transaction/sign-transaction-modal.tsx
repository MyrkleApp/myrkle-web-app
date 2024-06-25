import Button from "@/components/button";
import { MotionBox } from "@/components/motion-elements";
import TextArea from "@/components/text-area";
import { CloseButton, Flex, HStack, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";

export interface SignTransactionModalProps {
  txnData: string;
  handleTxnData: (data: string) => void;
  handleClose: () => void;
  handleContinueClick: () => void;
}

function SignTransactionModal({
  txnData,
  handleTxnData,
  handleClose,
  handleContinueClick,
}: SignTransactionModalProps) {
  const ref = useRef(null);

  const isDisabled = !txnData.trim().length;

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
      h="70vh"
      w="60vw"
      py={6}
      px={8}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Flex justify="space-between" mb={5}>
        <Text fontWeight="bold">Paste transaction</Text>
        <CloseButton onClick={handleClose} />
      </Flex>

      <TextArea
        bg="darkest"
        h="calc(100% - 150px)"
        value={txnData}
        onChange={(e: any) => handleTxnData(e.target.value)}
      />

      <Flex justify="flex-end" mt={7}>
        <HStack bg="secondary" gap="80px" pl={3} borderRadius={7}>
          <Text fontSize="sm">Sign my transaction</Text>
          <Button
            h="35px"
            w="150px"
            bg={isDisabled ? "secondary" : "primary"}
            isDisabled={isDisabled}
            onClick={handleContinueClick}
          >
            Continue
          </Button>
        </HStack>
      </Flex>
    </MotionBox>
  );
}

export default SignTransactionModal;
