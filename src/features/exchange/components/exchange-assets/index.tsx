import { Box, Flex } from "@chakra-ui/react";
import SwapLiquiditySwitch from "../swap-liquidity-switch";
import MakeExchange from "../make-exchange";

function ExchangeAssets() {
  return (
    <Flex justify="center" align="center" h="calc(100% - 45px)" bg="dark" borderRadius="20px" p={8}>
      <Box h="100%" w="95%" pos="relative">
        <Flex justify="center">
          <SwapLiquiditySwitch />
        </Flex>

        <MakeExchange />
      </Box>
    </Flex>
  );
}

export default ExchangeAssets;
