import TokenNftSwitch from "@/features/shared/components/token-nft-switch";
import { Box, Flex } from "@chakra-ui/react";
import SendToken from "../send-token";

function SendAssets() {
  return (
    <Flex justify="center" align="center" h="calc(100% - 45px)" bg="dark" borderRadius="20px" p={8}>
      <Box h="100%" w="100%" pos="relative">
        <Flex justify="center">
          <TokenNftSwitch />
        </Flex>

        <SendToken />
      </Box>
    </Flex>
  );
}

export default SendAssets;
