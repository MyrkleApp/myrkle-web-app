import Button from "@/components/button";
import ItemLabel from "@/components/item-label";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { useCreateTokenMutation } from "@/features/shared/redux/xrp.api";
import { TTxnPipeline } from "@/features/shared/types";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TMintTokenStep } from "../../types";
import Backdrop from "@/components/backdrop";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";
import MintTokenProgress from "./mint-token-progress";
import ProceedModal from "@/features/shared/components/proceed-modal";
import { TWalletProvider } from "@/features/wallet/types";

export interface TrustlineProps {
  issuerAddress: string;
  managerAddress: string;
  tokenName: string;
  totalSupply: string;
  issuerWalletProvider: TWalletProvider;
  handleMintTokenStep: (val: TMintTokenStep) => void;
  clearMintTokenState: () => void;
}

function CreateToken({
  issuerAddress,
  managerAddress,
  tokenName,
  totalSupply,
  issuerWalletProvider,
  handleMintTokenStep,
  clearMintTokenState,
}: TrustlineProps) {
  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("token");

  const { isOpen: isProceedOpen, onOpen: onOpenProceed, onClose: onCloseProceed } = useDisclosure();

  const [view, setView] = useState<TTxnPipeline>("default");

  const [createToken] = useCreateTokenMutation();

  useEffect(() => {
    if (xummTxnQrCode) {
      setView("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      setView("success");
      clearMintTokenState();
    } else setView("error-2");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitTxnSuccess]);

  const handleProceed = () => {
    onCloseProceed();

    setView("loading");

    createToken({
      issuer_addr: issuerAddress,
      manager_addr: managerAddress,
      token_name: tokenName,
      total_supply: totalSupply,
    })
      .unwrap()
      .then((res) => {
        handleSubmitTxn(res, issuerWalletProvider);
      })
      .catch(() => setView("error-1"));
  };

  const handleReset = () => {
    resetSubmitTxnResponse();
    setView("default");
    handleMintTokenStep("form");
  };

  return (
    <>
      <MintTokenProgress currentStep={4} />
      <Box px={7}>
        <ItemLabel title="Create token" fontSize="md" />
        <Text fontSize="xs" mb={10}>
          Final step! This transaction concludes the minting of {tokenName} token.
        </Text>
        <Button w="100%" onClick={onOpenProceed}>
          Proceed
        </Button>
      </Box>

      <Backdrop isOpen={isProceedOpen}>
        <ProceedModal
          text={`Heads up! For smooth transactions, ensure ${issuerAddress} matches your provider's active wallet.`}
          isLoading={false}
          handleProceed={handleProceed}
          handleClose={onCloseProceed}
          h="280px"
          w="330px"
        />
      </Backdrop>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}
        {view === "error-1" && (
          <ResponseModal isError={true} message="Something went wrong" handleClose={handleReset} />
        )}
        {view === "xumm-qr-code" && (
          <XummTxnModal qrCodeImage={xummTxnQrCode} handleClose={handleReset} />
        )}
        {view === "error-2" && (
          <ResponseModal isError={true} message={submitTxnResponseMsg} handleClose={handleReset} />
        )}
        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default CreateToken;
