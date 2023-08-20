import TokenNftSwitch from "@/features/wallet/components/token-nft-switch";
import WalletDetails from "@/features/wallet/components/wallet-details";
import Layout from "@/layout";
import { HStack } from "@chakra-ui/react";

function Wallet() {
  return (
    <Layout>
      <WalletDetails />
      <HStack mt={5}>
        <TokenNftSwitch />
      </HStack>
    </Layout>
  );
}

export default Wallet;
