import { useSelector } from "react-redux";
import { selectAssetType } from "../../redux/wallet.selectors";
import { Circle, HStack, Text } from "@chakra-ui/react";
import PlusIcon from "@/icons/plus";
import AddToken from "../add-token";

function AddAsset() {
  const assetType = useSelector(selectAssetType);

  if (assetType === "token") return <AddToken />;

  if (assetType === "nft") {
    return (
      <HStack>
        <Text fontSize="2xs">Receive NFT</Text>
        <Circle bg="textDark" size="17px" cursor="pointer">
          <PlusIcon fontSize="2xs" />
        </Circle>
      </HStack>
    );
  }
}

export default AddAsset;
