import Button from "@/components/button";
import Input from "@/components/input";
import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
import { Box, Flex, HStack, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import TokenItem from "./token-item";
import Backdrop from "@/components/backdrop";
import GenerateProtedtedEscrowModal from "./generate-protected-escrow-modal";
import { createPortal } from "react-dom";

function TokenDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MotionBox
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        h="100%"
        pr={1}
        overflow="hidden auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Box>
          <ItemLabel title="Token name" mb={1} />
          <TokenItem />
        </Box>
        <Box mb={2}>
          <ItemLabel title="Receiver address" mb={1} />
          <Input />
        </Box>
        <Box mb={2}>
          <ItemLabel title="Claim Date" mb={1} />
          <Input />
        </Box>
        <Box mb={3}>
          <ItemLabel title="Expiry Date" mb={1} />
          <Input />
        </Box>
        <Flex justify="center" mb={3}>
          <Button h="35px" borderRadius="30px" px={10} onClick={onOpen}>
            Generate Protected Escrow
          </Button>
        </Flex>

        <Box p={3} bg="darkest" borderRadius="20px">
          <HStack mb={4}>
            <Text fontSize="xs">Transaction fee</Text>
            <Spacer />
            <Text fontSize="xs">1.00</Text>
          </HStack>
          <Button w="100%">confirm</Button>
        </Box>
      </MotionBox>

      {isOpen &&
        createPortal(
          <Backdrop isOpen={isOpen}>
            <GenerateProtedtedEscrowModal handleClose={onClose} />
          </Backdrop>,
          document.body,
        )}
    </>
  );
}

export default TokenDetail;
