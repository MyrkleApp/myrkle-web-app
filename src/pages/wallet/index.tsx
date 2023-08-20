import AddAsset from "@/features/wallet/components/add-asset";
import MintAsset from "@/features/wallet/components/mint-asset";
import TokenNftSwitch from "@/features/wallet/components/token-nft-switch";
import WalletDetails from "@/features/wallet/components/wallet-details";
import Layout from "@/layout";
import { HStack, Spacer } from "@chakra-ui/react";

function Wallet() {
  return (
    <Layout>
      <WalletDetails />
      <HStack mt={5}>
        <AddAsset />
        <TokenNftSwitch />
        <Spacer />
        <MintAsset />
      </HStack>
    </Layout>
  );
}

export default Wallet;
