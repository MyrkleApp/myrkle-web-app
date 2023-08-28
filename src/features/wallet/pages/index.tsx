import TokenNftSwitch from "@/features/shared/components/token-nft-switch";
import AddAsset from "@/features/wallet/components/add-asset";
import ListAssets from "@/features/wallet/components/list-assets";
import MintAsset from "@/features/wallet/components/mint-asset";
import WalletDetails from "@/features/wallet/components/wallet-details";
import GalleryIcon from "@/icons/gallery";
import Layout from "@/layout";
import { Box, HStack, Spacer } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectAssetType } from "../redux/wallet.selectors";
import { Link } from "react-router-dom";

function Wallet() {
  const assetType = useSelector(selectAssetType);

  return (
    <Layout>
      <WalletDetails />

      <Box h="calc(62% - 35px)" pos="absolute" bottom="0" w="100%">
        <HStack mb={3}>
          <AddAsset />
          <TokenNftSwitch />
          {assetType === "nft" && (
            <Link to="nft-gallery">
              <GalleryIcon ml={5} />
            </Link>
          )}
          <Spacer />
          <MintAsset />
        </HStack>

        <ListAssets />
      </Box>
    </Layout>
  );
}

export default Wallet;
