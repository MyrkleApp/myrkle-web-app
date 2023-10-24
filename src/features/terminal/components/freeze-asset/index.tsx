import freezeAssetGray from "@/assets/asset-manager/freeze-gray.png";
import freezeAssetColored from "@/assets/asset-manager/freeze-colored.png";
import IconContainer from "../icon-container";
import { Image, useDisclosure } from "@chakra-ui/react";
import Backdrop from "@/components/backdrop";
import SelectTokenAmountModal from "@/features/shared/components/select-token-amount-modal";
import useSelectTokenAmount from "@/features/shared/hooks/use-select-token-amount";
import { useToggleTokenFreezeMutation } from "@/features/shared/redux/xrp.api";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useState } from "react";
import { TSelectTokenAmountModalState } from "../../types";
import ProceedModal from "@/features/shared/components/proceed-modal";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";

function FreezeAsset() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useSelector(selectAddress);

  const [modalState, setModalState] = useState<TSelectTokenAmountModalState>("select-token");

  const [, { handleSubmitTxn }] = useSubmitTxn();

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
      freeze: true,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        handleSubmitTxn(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <IconContainer title="Freeze Asset" onClick={onOpen}>
        <Image src={freezeAssetGray} alt="freeze Asset" h="60px" className="gray" />
        <Image src={freezeAssetColored} alt="freeze Asset" h="60px" className="colored" />
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
            text="You are about to freeze this token and keep it on hold"
            isLoading={isLoading}
            handleClose={handleClose}
            handleProceed={handleProceed}
          />
        )}
      </Backdrop>
    </>
  );
}

export default FreezeAsset;
