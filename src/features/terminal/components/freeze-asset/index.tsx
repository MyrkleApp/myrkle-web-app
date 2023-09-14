import freezeAssetGray from "@/assets/asset-manager/freeze-gray.png";
import freezeAssetColored from "@/assets/asset-manager/freeze-colored.png";
import IconContainer from "../icon-container";
import { Image, useDisclosure } from "@chakra-ui/react";
import Backdrop from "@/components/backdrop";
import SelectTokenAmountModal from "@/features/shared/components/select-token-amount-modal";

function FreezeAsset() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconContainer title="Freeze Asset" onClick={onOpen}>
        <Image src={freezeAssetGray} alt="freeze Asset" h="60px" className="gray" />
        <Image src={freezeAssetColored} alt="freeze Asset" h="60px" className="colored" />
      </IconContainer>

      <Backdrop isOpen={isOpen}>
        <SelectTokenAmountModal handleClose={onClose} />
      </Backdrop>
    </>
  );
}

export default FreezeAsset;
