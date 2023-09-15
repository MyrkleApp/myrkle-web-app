import Button from "@/components/button";
import { MotionBox } from "@/components/motion-elements";
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";
import xrpLogo from "@/assets/xrp-logo.svg";

export interface AddressModalProps {
  handleClose: () => void;
}

function GenerateProtedtedEscrowModal({ handleClose }: AddressModalProps) {
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
      h="350px"
      w="300px"
      p={4}
      bg="darker"
      borderRadius="30px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="flex-end">
        <CloseButton onClick={handleClose} />
      </Flex>
      <Box px={4} mt={1}>
        <Text fontSize="lg" fontWeight="bold" mb={6} lineHeight={1.2}>
          Generating a protected Escrow
        </Text>
        <Text fontSize="xs" fontWeight="bold" mb={"90px"}>
          Are you sure you want to proceed?
        </Text>

        <HStack mb={4}>
          <Text fontSize="xs">Transaction fee</Text>
          <Spacer />
          <Image src={xrpLogo} alt="logo" h="13px" />
          <Text fontSize="xs">0.001</Text>
        </HStack>

        <Button w="100%" h="40px" _hover={{ bg: "primary" }} zIndex={500}>
          confirm
        </Button>
      </Box>
    </MotionBox>
  );
}

export default GenerateProtedtedEscrowModal;
