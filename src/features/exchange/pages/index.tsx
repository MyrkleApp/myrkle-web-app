import Layout from "@/layout";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import ExchangeAssets from "../components/exchange-assets";
import ListOffers from "../components/list-offers";
import ListPendingOffers from "../components/list-pending-offers";

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
          </HStack>

          <Flex h="calc(100% - 45px)" direction="column" gap="15px">
            <Box h="60%" bg="dark" borderRadius="20px" px={4} py={6}>
              <ListOffers />
            </Box>

            <Box h="40%" bg="dark" borderRadius="20px" px={4} py={4}>
              <Text fontSize="sm" fontWeight="bold">
                Pending offers
              </Text>
              <ListPendingOffers />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
}

export default Exchange;
