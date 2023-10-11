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
import ItemLabel from "@/components/item-label";
import { nftFormatter } from "@/helpers";

export interface BurnItemModalProps {
  selectedNft: any;
  handleConfirmBurnClick: () => void;
  handleClose: () => void;
}

function BurnItemModal({ selectedNft, handleConfirmBurnClick, handleClose }: BurnItemModalProps) {
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
      maxH="100%"
      h="500px"
      w="650px"
      p={6}
      px={8}
      bg="darker"
      borderRadius="20px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <HStack mb={5}>
        <Text fontWeight="bold" fontSize="sm">
          Burn NFT
        </Text>
        <Spacer />
        <CloseButton onClick={handleClose} />
      </HStack>

      <Flex h="calc(100% - 60px)" overflow="hidden auto" gap={8}>
        <Flex w="50%" direction="column" justify="space-between">
          <Image
            src={nftFormatter(selectedNft?.image)}
            alt=""
            h="calc(100% - 70px)"
            w="100%"
            border="6px solid #515151"
            borderRadius="35px"
          />
          <Button bg="danger" letterSpacing={0.5} w="100%" onClick={handleConfirmBurnClick}>
            confirm burn
          </Button>
        </Flex>

        <Flex w="50%" direction="column" justify="space-between">
          <Box>
            <ItemLabel title="NFT Name" mb={1} />
            <Flex align="center" bg="secondary" h="40px" px={3} borderRadius="10px">
              <Text fontSize="xs">{selectedNft?.name}</Text>
            </Flex>
          </Box>

          <Box>
            <ItemLabel title="Owner address" mb={1} />
            <Flex align="center" bg="secondary" h="40px" px={3} borderRadius="10px">
              <Text fontSize="xs">{selectedNft?.issuer}</Text>
            </Flex>
          </Box>

          <Box>
            <ItemLabel title="NFT ID" mb={1} />
            <Flex align="center" bg="secondary" h="45px" px={3} borderRadius="10px">
              <Text fontSize="xs" wordBreak="break-word">
                {selectedNft?.id}
              </Text>
            </Flex>
          </Box>

          <Box h="45%">
            <ItemLabel title="Description" mb={1} />
            <Box bg="secondary" h="150px" px={3} py={1} borderRadius="10px">
              <Text fontSize="xs" wordBreak="break-word">
                {selectedNft?.description}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </MotionBox>
  );
}

export default BurnItemModal;
