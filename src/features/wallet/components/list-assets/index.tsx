import { useSelector } from "react-redux";
import { selectAssetType } from "../../redux/wallet.selectors";
import { Box } from "@chakra-ui/react";
import ListTokens from "../list-tokens";
import ListNftsSlider from "../list-nfts/list-nfts-slider";

function ListAssets() {
  const assetType = useSelector(selectAssetType);

  if (assetType === "token") {
    return (
      <Box h="calc(100% - 60px)" pos="absolute" bottom="0" w="100%" overflowY="auto">
        <ListTokens />
      </Box>
    );
  }

  if (assetType === "nft") {
    return (
      <Box
        h="calc(100% - 60px)"
        pos="absolute"
        bottom="0"
        w="100%"
        bg="dark"
        borderRadius="25px"
        py={4}
        px={5}
      >
        <ListNftsSlider />
      </Box>
    );
  }
}

export default ListAssets;
