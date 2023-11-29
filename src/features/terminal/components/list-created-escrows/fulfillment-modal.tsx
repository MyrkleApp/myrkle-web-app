import Button from "@/components/button";
import { MotionBox } from "@/components/motion-elements";
import { Box, CloseButton, Flex, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import Input from "@/components/input";

export interface FulfillmentModalProps {
  handleClose: () => void;
  fulfillment: string;
  handleFulfillment: (e: any) => void;
  claimEscrow: () => void;
}

function FulfillmentModal({
  handleClose,
  fulfillment,
  handleFulfillment,
  claimEscrow,
}: FulfillmentModalProps) {
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
      w="300px"
      p={4}
      pb={7}
      bg="darker"
      borderRadius="30px"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        // height: !generatedEscrowData ? 350 : 275,
        transition: { duration: 0.5 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="flex-end">
        <CloseButton onClick={handleClose} />
      </Flex>
      <Box px={4} mt={1}>
        <Text fontSize="lg" fontWeight="bold" mb={6} lineHeight={1.2}>
          This is a protected escrow
        </Text>

        <Text fontSize="xs" fontWeight="bold" mb={"20px"}>
          Enter the fulfillment to proceed
        </Text>

        <Input mb={3} value={fulfillment} onChange={handleFulfillment} />
        <Button
          bg={fulfillment ? "primary" : "secondary"}
          isDisabled={!fulfillment}
          w="100%"
          onClick={claimEscrow}
        >
          Claim Escrow
        </Button>
      </Box>
    </MotionBox>
  );
}

export default FulfillmentModal;
