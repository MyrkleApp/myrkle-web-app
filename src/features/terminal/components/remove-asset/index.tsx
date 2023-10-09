import removeAssetGray from "@/assets/asset-manager/remove-gray.png";
import removeAssetColored from "@/assets/asset-manager/remove-colored.png";
import IconContainer from "../icon-container";
import { Image, useDisclosure } from "@chakra-ui/react";
import Backdrop from "@/components/backdrop";
import SelectTokenAmountModal from "@/features/shared/components/select-token-amount-modal";
import ProceedModal from "@/features/shared/components/select-token-amount-modal/proceed-modal";
import useSelectTokenAmount from "@/features/shared/hooks/use-select-token-amount";
import { useRemoveTokenMutation } from "@/features/shared/redux/xrp.api";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TSelectTokenAmountModalState } from "../../types";

function RemoveAsset() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useSelector(selectAddress);

  const [modalState, setModalState] = useState<TSelectTokenAmountModalState>("select-token");

  const [
    { selectedToken, showTokenList, amount },
    { handleShowTokenList, handleTokenClick, handleAmount, handleReset },
  ] = useSelectTokenAmount();

  const [removeToken, { isLoading }] = useRemoveTokenMutation();

  const handleClose = () => {
    onClose();
    handleReset();
    setModalState("select-token");
  };

  const handleConfirmClick = () => {
    setModalState("proceed");
  };

  const handleProceed = () => {
    removeToken({
      sender_addr: address,
      token: selectedToken.token,
      issuer: selectedToken.issuer,
    })
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <IconContainer title="Remove Asset" handleClick={onOpen}>
        <Image src={removeAssetGray} alt="remove Asset" h="60px" className="gray" />
        <Image src={removeAssetColored} alt="remove Asset" h="60px" className="colored" />
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
            text="You are about to remove this token"
            isLoading={isLoading}
            handleClose={handleClose}
            handleProceed={handleProceed}
          />
        )}
      </Backdrop>
    </>
  );
}

export default RemoveAsset;
