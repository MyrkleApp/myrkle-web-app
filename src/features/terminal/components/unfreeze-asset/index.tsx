import unfreezeAssetGray from "@/assets/asset-manager/unfreeze-gray.png";
import unfreezeAssetColored from "@/assets/asset-manager/unfreeze-colored.png";
import IconContainer from "../icon-container";
import { Image, useDisclosure } from "@chakra-ui/react";
import Backdrop from "@/components/backdrop";
import SelectTokenAmountModal from "@/features/shared/components/select-token-amount-modal";

function UnfreezeAsset() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconContainer title="Unfreeze Asset" onClick={onOpen}>
        <Image src={unfreezeAssetGray} alt="unfreeze Asset" h="60px" className="gray" />
        <Image src={unfreezeAssetColored} alt="unfreeze Asset" h="60px" className="colored" />
      </IconContainer>

      <Backdrop isOpen={isOpen}>
        <SelectTokenAmountModal handleClose={onClose} />
      </Backdrop>
    </>
  );
}

export default UnfreezeAsset;
