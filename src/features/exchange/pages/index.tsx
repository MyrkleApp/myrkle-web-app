import Layout from "@/layout";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import ExchangeAssets from "../components/exchange-assets";
import ListOffers from "../components/list-offers";
import ListPendingOffers from "../components/list-pending-offers";
import { useSelector } from "react-redux";
import { selectExchangeType } from "../redux/exchange.selectors";
import ListPendingLiquidity from "../components/list-pending-liquidity";

const title = {
  swap: "Offers",
  liquidity: "Pending Liquidity",
};

function Exchange() {
  const exchangeType = useSelector(selectExchangeType);

  return (
    <Layout>
      <Flex
        h="100%"
        overflow="hidden auto"
        justify="space-between"
        gap={5}
        direction={["column", null, null, "row"]}
        pr={2}
      >
        <Box ml="10px" w={["100%", null, null, "calc(50% - 10px)"]}>
          <HStack h="45px">
            <Text fontWeight="bold" fontSize="lg">
              Exchange
            </Text>
          </HStack>

          <ExchangeAssets />
        </Box>

        <Box w={["100%", null, null, "calc(50% - 10px)"]}>
          <HStack h="45px">
            <Text fontWeight="bold" fontSize="lg">
              {title[exchangeType]}
            </Text>
          </HStack>

          {exchangeType === "swap" && (
            <Flex h="calc(100% - 45px)" minH="470px" direction="column">
              <Box h="60%" bg="dark" borderRadius="20px" px={4} py={6} mb="15px">
                <ListOffers />
              </Box>

              <Box h="calc(40% - 15px)" bg="dark" borderRadius="20px" px={4} py={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Pending offers
                </Text>
                <ListPendingOffers />
              </Box>
            </Flex>
          )}

          {exchangeType === "liquidity" && (
            <Flex h="calc(100% - 45px)" direction="column">
              <Box h="100%" bg="dark" borderRadius="20px" px={4} py={6}>
                <ListPendingLiquidity />
              </Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </Layout>
  );
}

export default Exchange;
