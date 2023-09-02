import removeAssetGray from "@/assets/asset-manager/remove-gray.png";
import removeAssetColored from "@/assets/asset-manager/remove-colored.png";
import IconContainer from "../icon-container";
import { Image, useDisclosure } from "@chakra-ui/react";
import Backdrop from "@/components/backdrop";
import SelectTokenAmountModal from "@/features/shared/components/select-token-amount-modal";

function RemoveAsset() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconContainer title="Remove Asset" h="180px" handleClick={onOpen}>
        <Image src={removeAssetGray} alt="remove Asset" h="60px" className="gray" />
        <Image src={removeAssetColored} alt="remove Asset" h="60px" className="colored" />
      </IconContainer>

      <Backdrop isOpen={isOpen}>
        <SelectTokenAmountModal handleClose={onClose} />
      </Backdrop>
    </>
  );
}

export default RemoveAsset;
