import ArrowLeftIcon from "@/icons/arrow-left";
import Layout from "@/layout";
import ROUTES from "@/routes";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MintNftForm from "../components/mint-nft-form";

function NewAsset() {
  return (
    <Layout>
      <HStack h="50px">
        <Link to={ROUTES.TERMINAL_ASSET_MANAGER}>
          <HStack>
            <ArrowLeftIcon />
            <Text fontSize="sm" fontWeight="bold">
              Add Asset
            </Text>
          </HStack>
        </Link>
      </HStack>

      <Flex h="calc(100% - 50px)" bg="dark" borderRadius="20px" p={5} gap={3}>
        <Box bg="" w="20%">
          one
        </Box>
        <Box bg="" w="40%">
          two
        </Box>
        <Box w="40%" overflow="hidden auto">
          <MintNftForm />
        </Box>
      </Flex>
    </Layout>
  );
}

export default NewAsset;
