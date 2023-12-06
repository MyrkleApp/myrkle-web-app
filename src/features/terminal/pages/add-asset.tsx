import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import Layout from "@/layout";
import ArrowLeftIcon from "@/icons/arrow-left";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
import AddTokenTerminal from "../components/add-token-terminal";
import AddNftTerminal from "../components/add-nft-terminal";

function AddAsset() {
  return (
    <Layout>
      <Box h="100%">
        <HStack h="70px" align="flex-start">
          <Link to={ROUTES.TERMINAL_ASSET_MANAGER}>
            <HStack mt={3}>
              <ArrowLeftIcon />
              <Text fontSize="lg" fontWeight="bold">
                Add Asset
              </Text>
            </HStack>
          </Link>
        </HStack>

        <Box h="calc(100% - 70px)" overflow="hidden auto">
          <SimpleGrid pr={3} pl={5} columns={5} spacingX={8} spacingY={10}>
            <AddTokenTerminal />
            <AddNftTerminal />
          </SimpleGrid>
        </Box>
      </Box>
    </Layout>
  );
}

export default AddAsset;
