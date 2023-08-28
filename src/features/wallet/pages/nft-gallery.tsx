import ArrowLeftIcon from "@/icons/arrow-left";
import Layout from "@/layout";
import { Box, Flex, HStack, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import MintAsset from "../components/mint-asset";
import ListNftsGallery from "../components/list-nfts/list-nfts-gallery";

function NftGallery() {
  const navigate = useNavigate();

  return (
    <Layout>
      <HStack h="50px" px={3}>
        <ArrowLeftIcon cursor="pointer" onClick={() => navigate(-1)} />
        <Spacer />
        <MintAsset />
      </HStack>

      <Flex justify="center" align="center" h="calc(100% - 50px)" bg="dark" borderRadius="20px">
        <Box h="calc(100% - 100px)" w="calc(100% - 150px)" overflow="hidden auto">
          <ListNftsGallery />
        </Box>
      </Flex>
    </Layout>
  );
}

export default NftGallery;
