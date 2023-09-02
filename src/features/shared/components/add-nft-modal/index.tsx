import Button from "@/components/button";
import Input from "@/components/input";
import { MotionBox } from "@/components/motion-elements";
import { Box, CloseButton, Flex, HStack, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef, useState } from "react";
import NftAddCard from "./nft-add-card";
import { AnimatePresence } from "framer-motion";
import nftImage from "@/assets/nft.png";

export interface AddNftModalProps {
  handleClose: () => void;
}

function AddNftModal({ handleClose }: AddNftModalProps) {
  const [showNftCard, setShowNftCard] = useState(false);

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  const handleConfirmClick = () => {
    if (showNftCard) setShowNftCard(false);
    else setShowNftCard(true);
  };

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="200px"
      w="270px"
      p={4}
      bg="darker"
      borderRadius="15px"
      animate={{
        opacity: 1,
        height: showNftCard ? "380px" : "200px",
        width: showNftCard ? "350px" : "270px",
        transition: { type: "spring", stiffness: 100 },
      }}
    >
      <Flex justify="flex-end">
        <CloseButton onClick={handleClose} />
      </Flex>
      <Box px={4} mt={1} h="calc(100% - 50px)" pos="relative">
        <AnimatePresence>
          {showNftCard && (
            <MotionBox
              h="170px"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NftAddCard name={`Kilowaksi`} image={nftImage} />
            </MotionBox>
          )}
        </AnimatePresence>

        <Box pos="absolute" w="100%" px="inherit" left={0} bottom={0}>
          <HStack mb={1}>
            <Text fontSize="2xs" color="#fff" fontWeight="bold">
              NFT Sell ID
            </Text>
          </HStack>

          <Input mb={4} />

          <Button w="100%" h="40px" bg="secondary" color="textDark" onClick={handleConfirmClick}>
            confirm
          </Button>
        </Box>
      </Box>
    </MotionBox>
  );
}

export default AddNftModal;
