import History from "@/features/transactions/components/history";
import SendAssets from "@/features/transactions/components/send-assets";
import HistoryIcon from "@/icons/history";
import Layout from "@/layout";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";

function Transaction() {
  return (
    <Layout>
      <Flex
        h="100%"
        justify="space-between"
        gap={5}
        overflow="hidden auto"
        pr={2}
        direction={["column", null, null, "row"]}
      >
        <Box w={["100%", null, null, "calc(50% - 10px)"]} ml="10px">
          <HStack h="45px">
            <Text fontWeight="bold" fontSize="lg">
              Send Assets
            </Text>
          </HStack>

          <SendAssets />
        </Box>

        <Box w={["100%", null, null, "50%"]}>
          <HStack h="45px">
            <Text fontWeight="bold" fontSize="lg">
              History
            </Text>
            <HistoryIcon />
          </HStack>

          <History />
        </Box>
      </Flex>
    </Layout>
  );
}

export default Transaction;
