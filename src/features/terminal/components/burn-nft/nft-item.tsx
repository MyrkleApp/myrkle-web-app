import { Box, Image } from "@chakra-ui/react";
import nftImage from "@/assets/nft.png";

export interface NftItemProps {
  handleClick: () => void;
}

function NftItem({ handleClick }: NftItemProps) {
  return (
    <Box cursor="pointer" onClick={handleClick}>
      <Image src={nftImage} alt="" w="100%" aspectRatio={1} objectFit="cover" borderRadius="20px" />
    </Box>
  );
}

export default NftItem;
