import Button from "@/components/button";
import { HStack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectAssetType } from "../../redux/wallet.selectors";

function MintAsset() {
  const assetType = useSelector(selectAssetType);

  return (
    <HStack>
      <Text color="textDark" fontSize="xs">
        Can't find what you're looking for?
      </Text>
      <Button h="27px" p="7px 12px" bg="primary" _hover={{ bg: "primary" }}>
        Mint {assetType === "token" ? "Token" : "NFT"}
      </Button>
    </HStack>
  );
}

export default MintAsset;
