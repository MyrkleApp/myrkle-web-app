import { Box, Flex } from "@chakra-ui/react";
import SwapLiquiditySwitch from "../swap-liquidity-switch";
import Swap from "../swap";

function ExchangeAssets() {
  return (
    <Flex justify="center" align="center" h="calc(100% - 45px)" bg="dark" borderRadius="20px" p={8}>
      <Box h="100%" w="95%" pos="relative">
        <Flex justify="center">
          <SwapLiquiditySwitch />
        </Flex>

        <Swap />
      </Box>
    </Flex>
  );
}

export default ExchangeAssets;
