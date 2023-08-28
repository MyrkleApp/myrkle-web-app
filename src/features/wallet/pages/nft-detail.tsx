import Layout from "@/layout";
import { Box } from "@chakra-ui/react";
import NftDetailContent from "../components/list-nfts/nft-detail-content";

function NftDetail() {
  return (
    <Layout>
      <Box h="100%" w="calc(100% - 100px)" bg="dark" ml="auto" borderRadius="20px" p={6}>
        <NftDetailContent />
      </Box>
    </Layout>
  );
}

export default NftDetail;
