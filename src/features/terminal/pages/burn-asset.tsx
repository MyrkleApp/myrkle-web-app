import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import Layout from "@/layout";
import ArrowLeftIcon from "@/icons/arrow-left";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
import BurnToken from "../components/burn-token";
import BurnNft from "../components/burn-nft";

function BurnAsset() {
  return (
    <Layout>
      <Box h="100%">
        <HStack h="70px" align="flex-start">
          <Link to={ROUTES.TERMINAL_ASSET_MANAGER}>
            <HStack mt={3}>
              <ArrowLeftIcon />
              <Text fontSize="sm" fontWeight="bold">
                Burn Asset
              </Text>
            </HStack>
          </Link>
        </HStack>

        <Box h="calc(100% - 70px)" overflow="hidden auto">
          <SimpleGrid pr={3} pl={5} columns={5} spacingX={8} spacingY={10}>
            <BurnToken />
            <BurnNft />
          </SimpleGrid>
        </Box>
      </Box>
    </Layout>
  );
}

export default BurnAsset;
