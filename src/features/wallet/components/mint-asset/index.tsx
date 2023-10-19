import Button from "@/components/button";
import { HStack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectAssetType } from "../../redux/wallet.selectors";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";

function MintAsset() {
  const assetType = useSelector(selectAssetType);

  return (
    <HStack>
      <Text color="textDark" fontSize="xs">
        Can't find what you're looking for?
      </Text>
      <Link to={`${ROUTES.TERMINAL_NEW_ASSET}?asset=${assetType}`}>
        <Button h="27px" p="7px 12px" bg="primary" borderRadius="5px" _hover={{ bg: "primary" }}>
          Mint {assetType === "token" ? "Token" : "NFT"}
        </Button>
      </Link>
    </HStack>
  );
}

export default MintAsset;
