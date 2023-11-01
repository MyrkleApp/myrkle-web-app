import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import nftImage from "@/assets/nft.png";

export interface NftSellOfferItemProps {
  image: string;
  name: string;
  issuer: string;
}

function NftSellOfferItem() {
  return (
    <HStack h="50px" bg="secondary" p={1.5} mb={2} borderRadius="5px">
      <Image src={nftImage} alt="" h="100%" aspectRatio={1.2} borderRadius="5px" mr={2} />
      <VStack align="flex-start" justify="center">
        <Text fontSize="xs" mb={-4} fontWeight="bold">
          Jack xxx
        </Text>
        <Text fontSize="xs">xxxxxxxxxxxxxxxxxxxxxxxxx</Text>
      </VStack>
    </HStack>
  );
}

export default NftSellOfferItem;
