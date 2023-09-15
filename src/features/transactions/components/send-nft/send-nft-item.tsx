import { Box, Image, Text } from "@chakra-ui/react";
import nftImage from "@/assets/nft.png";

export interface SendNftItemProps {
  handleClick: () => void;
}

function SendNftItem({ handleClick }: SendNftItemProps) {
  return (
    <Box cursor="pointer" onClick={handleClick}>
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
