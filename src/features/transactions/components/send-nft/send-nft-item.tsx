import { Box, Image, Text } from "@chakra-ui/react";
import nftImage from "@/assets/nft.png";

function SendNftItem() {
  return (
    <Box cursor="pointer">
      <Image
        src={nftImage}
        alt=""
        w="100%"
        aspectRatio={1}
        objectFit="cover"
        borderRadius="20px"
        mb={2}
      />
      <Text fontSize="sm">Jack XX</Text>
    </Box>
  );
}

export default SendNftItem;
