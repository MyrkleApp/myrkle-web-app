import unfreezeAssetGray from "@/assets/asset-manager/unfreeze-gray.png";
import unfreezeAssetColored from "@/assets/asset-manager/unfreeze-colored.png";
import IconContainer from "../icon-container";
import { Image, useDisclosure } from "@chakra-ui/react";
import Backdrop from "@/components/backdrop";
import SelectTokenAmountModal from "@/features/shared/components/select-token-amount-modal";
import useSelectTokenAmount from "@/features/shared/hooks/use-select-token-amount";
import { useToggleTokenFreezeMutation } from "@/features/shared/redux/xrp.api";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TSelectTokenAmountModalState } from "../../types";
import ProceedModal from "@/features/shared/components/proceed-modal";

function UnfreezeAsset() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useSelector(selectAddress);

  const [modalState, setModalState] = useState<TSelectTokenAmountModalState>("select-token");

  const [
    { selectedToken, showTokenList, amount },
    { handleShowTokenList, handleTokenClick, handleAmount, handleReset },
  ] = useSelectTokenAmount();

  const [freezeToken, { isLoading }] = useToggleTokenFreezeMutation();

  const handleClose = () => {
    onClose();
    handleReset();
    setModalState("select-token");
  };

  const handleConfirmClick = () => {
    setModalState("proceed");
  };

  const handleProceed = () => {
    freezeToken({
      sender_addr: address,
      target_addr: address,
      token_name: selectedToken.token,
      freeze: false,
    })
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <IconContainer title="Unfreeze Asset" onClick={onOpen}>
        <Image src={unfreezeAssetGray} alt="unfreeze Asset" h="60px" className="gray" />
        <Image src={unfreezeAssetColored} alt="unfreeze Asset" h="60px" className="colored" />
      </IconContainer>

      <Backdrop isOpen={isOpen}>
        {modalState === "select-token" && (
          <SelectTokenAmountModal
            selectedToken={selectedToken}
            showTokenList={showTokenList}
            amount={amount}
            handleShowTokenList={handleShowTokenList}
            handleTokenClick={handleTokenClick}
            handleAmount={handleAmount}
            handleConfirmClick={handleConfirmClick}
            handleClose={handleClose}
          />
        )}

        {modalState === "proceed" && (
          <ProceedModal
            text="You are about to unfreeze this token"
            isLoading={isLoading}
            handleClose={handleClose}
            handleProceed={handleProceed}
          />
        )}
      </Backdrop>
    </>
  );
}

export default UnfreezeAsset;
