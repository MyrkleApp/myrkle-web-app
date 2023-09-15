import { MotionBox } from "@/components/motion-elements";
import { Box, CloseButton, HStack, Spacer, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import ListNftItems from "./list-nft-items";

export interface BurnListModalProps {
  handleClose: () => void;
  handleItemClick: () => void;
}

function BurnListModal({ handleClose, handleItemClick }: BurnListModalProps) {
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
      h="calc(100% - 20px)"
      w="calc(100% - 20px)"
      py={6}
      px="60px"
      bg="darker"
      borderRadius="20px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <HStack mb={3}>
        <Spacer />
        <CloseButton onClick={handleClose} />
      </HStack>

      <Box h="calc(100% - 50px)" overflow="hidden auto">
        <ListNftItems handleItemClick={handleItemClick} />
      </Box>
    </MotionBox>
  );
}

export default BurnListModal;
