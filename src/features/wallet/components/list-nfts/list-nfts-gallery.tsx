import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import NftCard from "./nft-card";
import PlusIcon from "@/icons/plus";

function ListNftsGallery() {
  return (
    <SimpleGrid columns={4} spacingX={4} spacingY={10} pr={4}>
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <Box key={i}>
            <NftCard />
          </Box>
        ))}
      <Flex justify="center" align="center" bg="secondary" borderRadius="35px" cursor="pointer">
        <PlusIcon color="#858585" fontSize="5xl" />
      </Flex>
    </SimpleGrid>
  );
}

export default ListNftsGallery;
