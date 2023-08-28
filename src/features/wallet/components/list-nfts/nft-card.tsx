import { Box, Flex, Image, Text } from "@chakra-ui/react";
import nftImage from "@/assets/nft.png";
import Button from "@/components/button";

function NftCard() {
  return (
    <Box
      w="100%"
      h="100%"
      borderRadius="35px"
      border="4px solid #515151"
      overflow="hidden"
      position="relative"
      cursor="pointer"
      _hover={{
        "& > div": {
          bottom: "0",
          transition: "0.1s linear all",
        },
      }}
    >
      <Image src={nftImage} alt="" w="100%" h="100%" objectFit="cover" />

      <Flex
        align="center"
        justify="space-between"
        pos="absolute"
        bottom="-30%"
        left={0}
        h="30%"
        w="100%"
        px={5}
        bg="#1d1c1c"
        transition="0.1s linear all"
        gap={2}
      >
        <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" fontSize="sm">
          Jack XXXXXXXXXXXXXX
        </Text>
        <Button w="120px">Send</Button>
      </Flex>
    </Box>
  );
}

export default NftCard;
