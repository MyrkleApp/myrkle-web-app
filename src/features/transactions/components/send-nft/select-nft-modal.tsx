import { MotionBox } from "@/components/motion-elements";
import { Box, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import ListSendNft from "./list-send-nft";

export interface SelectNftModalProps {
  handleClose: () => void;
  handleNftItemClick: () => void;
}

function SelectNftModal({ handleClose, handleNftItemClick }: SelectNftModalProps) {
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
      h="80%"
      w="65%"
      py={6}
      px={8}
      bg="darker"
      borderRadius="20px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Text fontWeight="bold" mb={3}>
        Select NFT
      </Text>

      <Box h="calc(100% - 50px)" overflow="hidden auto">
        <ListSendNft handleNftItemClick={handleNftItemClick} />
      </Box>

      {/* <Flex justify="center" align="center" h="calc(100% - 50px)" bg="dark" borderRadius="20px">
        <Box h="calc(100% - 100px)" w="calc(100% - 150px)" border="1px solid red" overflow="hidden auto">
          <ListNftsGallery />
        </Box>
      </Flex> */}
    </MotionBox>
  );
}

export default SelectNftModal;
