import TokenNftSwitch from "@/features/shared/components/token-nft-switch";
import AddAsset from "@/features/wallet/components/add-asset";
import ListTokens from "@/features/wallet/components/list-tokens";
import MintAsset from "@/features/wallet/components/mint-asset";
import WalletDetails from "@/features/wallet/components/wallet-details";
import Layout from "@/layout";
import { Box, HStack, Spacer } from "@chakra-ui/react";

function Wallet() {
  return (
    <Layout>
      <WalletDetails />

      <Box h="calc(62% - 35px)" pos="absolute" bottom="0" w="100%">
        <HStack mb={3}>
          <AddAsset />
          <TokenNftSwitch />
          <Spacer />
          <MintAsset />
        </HStack>

        <Box h="calc(100% - 60px)" pos="absolute" bottom="0" w="100%" overflowY="scroll">
          <ListTokens />
        </Box>
      </Box>
    </Layout>
  );
}

export default Wallet;
