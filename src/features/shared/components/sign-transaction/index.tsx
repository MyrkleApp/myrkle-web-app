import Backdrop from "@/components/backdrop";
import Button from "@/components/button";
import { Box, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import SignTransactionModal from "./sign-transaction-modal";
import { useEffect, useRef, useState } from "react";
import SelectWalletProvider from "@/features/auth/components/select-wallet-provider";
import useSubmitTxn from "../../hooks/use-submit-txn";
import { TWalletProvider } from "@/features/wallet/types";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";

function SignTransaction() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectProviderRef = useRef(null);

  const [txnData, setTxnData] = useState("");
  const [modalView, setModalView] = useState<
    "sign-txn-data" | "select-provider" | "xumm-qr-code" | "success" | "error" | "loading"
  >("sign-txn-data");

  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("");

  useOutsideClick({
    ref: selectProviderRef,
    handler: () => {
      if (modalView === "select-provider") {
        handleReset();
      }
    },
  });

  useEffect(() => {
    if (xummTxnQrCode) {
      setModalView("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      setModalView("success");
    } else setModalView("error");
  }, [isSubmitTxnSuccess]);

  const handleTxnData = (data: string) => setTxnData(data);

  const handleContinueClick = () => {
    setModalView("select-provider");
  };

  const handleSelectWallet = (walletProvider: TWalletProvider) => {
    handleSubmitTxn(txnData, walletProvider);
    setModalView("loading");
  };

  function handleReset() {
    resetSubmitTxnResponse();
    setTxnData("");
    setModalView("sign-txn-data");
    onClose();
  }

  return (
    <>
      <Button bg="secondary" h="30px" fontSize="xs" onClick={onOpen}>
        Sign Transaction
      </Button>

      <Backdrop isOpen={isOpen}>
        {modalView === "sign-txn-data" && (
          <SignTransactionModal
            txnData={txnData}
            handleTxnData={handleTxnData}
            handleClose={onClose}
            handleContinueClick={handleContinueClick}
          />
        )}
        {modalView === "select-provider" && (
          <Box ref={selectProviderRef} w="fit-content">
            <SelectWalletProvider
              handleMyrkleClick={() => {
                return;
              }}
              handleXummClick={() => handleSelectWallet("xumm")}
              handleCrossmarkClick={() => handleSelectWallet("crossmark")}
              handleGemWalletClick={() => handleSelectWallet("gemwallet")}
              hideLogin
              left="50%"
              transform="translate(-50%, -50%)"
            />
          </Box>
        )}
        {modalView === "xumm-qr-code" && (
          <XummTxnModal qrCodeImage={xummTxnQrCode} handleClose={handleReset} />
        )}
        {modalView === "loading" && <MyrkleLoader />}
        {modalView === "error" && (
          <ResponseModal isError={true} message={submitTxnResponseMsg} handleClose={handleReset} />
        )}
        {modalView === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default SignTransaction;
