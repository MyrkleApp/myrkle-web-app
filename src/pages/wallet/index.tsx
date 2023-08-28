import TokenNftSwitch from "@/features/shared/components/token-nft-switch";
import AddAsset from "@/features/wallet/components/add-asset";
import ListAssets from "@/features/wallet/components/list-assets";
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

        <ListAssets />
      </Box>
    </Layout>
  );
}

export default Wallet;
