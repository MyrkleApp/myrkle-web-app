import Layout from "@/layout";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import ExchangeAssets from "../components/exchange-assets";

function Exchange() {
  return (
    <Layout>
      <Flex h="100%" justify="space-between" gap={5}>
        <Box w="50%">
          <HStack h="45px">
            <Text fontWeight="bold">Exchange</Text>
          </HStack>

          <ExchangeAssets />
        </Box>

        <Box w="50%">
          <HStack h="45px">
            <Text fontWeight="bold">Offers</Text>
            {/* <HistoryIcon /> */}
          </HStack>

          {/* <History /> */}
        </Box>
      </Flex>
    </Layout>
  );
}

export default Exchange;
