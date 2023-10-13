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

function BurnToken() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useSelector(selectAddress);

  const [modalState, setModalState] = useState<TSelectTokenAmountModalState>("select-token");

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
    burnToken({
      sender_addr: address,
      issuer_addr: selectedToken.issuer,
      token: selectedToken.token,
      amount,
    })
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
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
      </Backdrop>
    </>
  );
}

export default BurnToken;
