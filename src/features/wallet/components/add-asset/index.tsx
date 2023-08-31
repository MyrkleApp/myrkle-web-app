import { useSelector } from "react-redux";
import { selectAssetType } from "../../redux/wallet.selectors";
import AddToken from "../add-token";
import AddNft from "../add-nft";

function AddAsset() {
  const assetType = useSelector(selectAssetType);

  if (assetType === "token") return <AddToken />;

  if (assetType === "nft") return <AddNft />;
}

export default AddAsset;
