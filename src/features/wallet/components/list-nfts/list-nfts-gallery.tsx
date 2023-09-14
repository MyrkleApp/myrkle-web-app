import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import NftCard from "./nft-card";
import PlusIcon from "@/icons/plus";

function ListNftsGallery() {
  return (
    <SimpleGrid columns={4} spacing={4} pr={4}>
      <Flex justify="center" align="center" bg="secondary" borderRadius="35px" cursor="pointer">
        <PlusIcon color="#858585" fontSize="5xl" />
      </Flex>
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <Box key={i}>
            <NftCard />
          </Box>
        ))}
    </SimpleGrid>
  );
}

export default ListNftsGallery;
