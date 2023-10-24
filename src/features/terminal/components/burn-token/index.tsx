import Backdrop from "@/components/backdrop";
import ProceedModal from "@/features/shared/components/proceed-modal";
import SelectTokenAmountModal from "@/features/shared/components/select-token-amount-modal";
import useSelectTokenAmount from "@/features/shared/hooks/use-select-token-amount";
import { useBurnTokenMutation } from "@/features/shared/redux/xrp.api";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TSelectTokenAmountModalState } from "../../types";
import IconContainer from "../icon-container";
import TokenListIcon from "@/icons/token-list";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";

function BurnToken() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useSelector(selectAddress);

  const [modalState, setModalState] = useState<TSelectTokenAmountModalState>("select-token");

  const [, { handleSubmitTxn }] = useSubmitTxn();

  const [
    { selectedToken, showTokenList, amount },
    { handleShowTokenList, handleTokenClick, handleAmount, handleReset },
  ] = useSelectTokenAmount();

  const [burnToken, { isLoading }] = useBurnTokenMutation();

  const handleClose = () => {
    onClose();
    handleReset();
    setModalState("select-token");
  };

  const handleConfirmClick = () => {
    setModalState("proceed");
  };

  const handleProceed = () => {
    setModalState("loading");

    burnToken({
      sender_addr: address,
      issuer_addr: selectedToken.issuer,
      token: selectedToken.token,
      amount,
    })
      .unwrap()
      .then((res) => {
        const successCallback = () => setModalState("success");
        const errorCallback = () => setModalState("error-2");
        handleSubmitTxn(res, successCallback, errorCallback);
      })
      .catch(() => setModalState("error-1"));
  };

  return (
    <>
      <IconContainer title="Token" h="210px" onClick={onOpen}>
        <TokenListIcon fill="none" fontSize="50px" color="#4E4E4E" />
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
            text="You are about to burn this token from your wallet."
            isLoading={isLoading}
            handleClose={handleClose}
            handleProceed={handleProceed}
          />
        )}

        {modalState === "loading" && <MyrkleLoader />}

        {modalState === "error-1" && <ResponseModal isError={true} handleClose={handleClose} />}

        {modalState === "error-2" && <ResponseModal isError={true} handleClose={handleClose} />}

        {modalState === "success" && <ResponseModal isError={false} handleClose={handleClose} />}
      </Backdrop>
    </>
  );
}

export default BurnToken;
