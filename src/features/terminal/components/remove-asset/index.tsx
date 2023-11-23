import removeAssetGray from "@/assets/asset-manager/remove-gray.png";
import removeAssetColored from "@/assets/asset-manager/remove-colored.png";
import IconContainer from "../icon-container";
import { Image, useDisclosure } from "@chakra-ui/react";
import Backdrop from "@/components/backdrop";
import SelectTokenAmountModal from "@/features/shared/components/select-token-amount-modal";
import useSelectTokenAmount from "@/features/shared/hooks/use-select-token-amount";
import { useRemoveTokenMutation } from "@/features/shared/redux/xrp.api";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TSelectTokenAmountModalState } from "../../types";
import ProceedModal from "@/features/shared/components/proceed-modal";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import ResponseModal from "@/components/response-modal";
import MyrkleLoader from "@/components/myrkle-loader";
import XummTxnModal from "@/components/xumm-txn-modal";

function RemoveAsset() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useSelector(selectAddress);

  const [modalState, setModalState] = useState<TSelectTokenAmountModalState>("select-token");

  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn("token");

  const [
    { selectedToken, showTokenList, amount },
    { handleShowTokenList, handleTokenClick, handleAmount, handleReset },
  ] = useSelectTokenAmount();

  const [removeToken, { isLoading }] = useRemoveTokenMutation();

  // ====================================================================================
  // effects
  // ====================================================================================

  useEffect(() => {
    if (xummTxnQrCode) {
      setModalState("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      setModalState("success");
    } else setModalState("error-2");
  }, [isSubmitTxnSuccess]);

  // ====================================================================================
  // handlers
  // ====================================================================================

  const handleClose = () => {
    onClose();
    handleReset();
    setModalState("select-token");
    resetSubmitTxnResponse();
  };

  const handleConfirmClick = () => {
    setModalState("proceed");
  };

  const handleProceed = () => {
    setModalState("loading");

    removeToken({
      sender_addr: address,
      token: selectedToken.token,
      issuer: selectedToken.issuer,
    })
      .unwrap()
      .then((res) => {
        handleSubmitTxn(res);
      })
      .catch(() => setModalState("error-1"));
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
            hideAmount
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

        {modalState === "loading" && <MyrkleLoader />}

        {modalState === "error-1" && <ResponseModal isError={true} handleClose={handleClose} />}

        {modalState === "xumm-qr-code" && (
          <XummTxnModal qrCodeImage={xummTxnQrCode} handleClose={handleReset} />
        )}

        {modalState === "error-2" && <ResponseModal isError={true} handleClose={handleClose} />}

        {modalState === "success" && <ResponseModal isError={false} handleClose={handleClose} />}
      </Backdrop>
    </>
  );
}

export default RemoveAsset;
