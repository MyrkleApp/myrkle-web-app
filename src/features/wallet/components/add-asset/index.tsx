import { useSelector } from "react-redux";
import { selectAssetType } from "../../redux/wallet.selectors";
import { Circle, HStack, Text } from "@chakra-ui/react";
import PlusIcon from "@/icons/plus";

function AddAsset() {
  const assetType = useSelector(selectAssetType);

  return (
    <HStack>
      <Text fontSize="2xs">{assetType === "token" ? "Add Token" : "Receive NFT"}</Text>
      <Circle bg="textDark" size="17px" cursor="pointer">
        <PlusIcon fontSize="2xs" />
      </Circle>
    </HStack>
  );
}

export default AddAsset;
