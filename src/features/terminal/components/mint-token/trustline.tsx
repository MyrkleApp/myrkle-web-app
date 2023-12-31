import Button from "@/components/button";
import ItemLabel from "@/components/item-label";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { useCreateTrustlineMutation } from "@/features/shared/redux/xrp.api";
import { TTxnPipeline } from "@/features/shared/types";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TMintTokenStep } from "../../types";
import Backdrop from "@/components/backdrop";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";
import MintTokenProgress from "./mint-token-progress";
import ProceedModal from "@/features/shared/components/proceed-modal";

export interface TrustlineProps {
  managerAddress: string;
  tokenName: string;
  totalSupply: string;
  handleMintTokenStep: (val: TMintTokenStep) => void;
}

function Trustline({
  managerAddress,
  tokenName,
  totalSupply,
  handleMintTokenStep,
}: TrustlineProps) {
  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("token");

  const { isOpen: isProceedOpen, onOpen: onOpenProceed, onClose: onCloseProceed } = useDisclosure();

  const address = useSelector(selectAddress);

  const [view, setView] = useState<TTxnPipeline>("default");

  const [createTrustline] = useCreateTrustlineMutation();

  useEffect(() => {
    if (xummTxnQrCode) {
      setView("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      handleMintTokenStep("create-token");
    } else setView("error-2");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitTxnSuccess]);

  const handleProceed = () => {
    onCloseProceed();
    setView("loading");

    createTrustline({
      issuer_addr: address,
      manager_addr: managerAddress,
      token_name: tokenName,
      total_supply: totalSupply,
    })
      .unwrap()
      .then((res) => {
        handleSubmitTxn(res);
      })
      .catch(() => setView("error-1"));
  };

  const handleReset = () => {
    resetSubmitTxnResponse();
    setView("default");
  };

  return (
    <>
      <MintTokenProgress currentStep={3} />
      <Box px={7}>
        <ItemLabel title="Create Trustline" fontSize="md" />
        <Text fontSize="xs" mb={10}>
          Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur
          adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet,
          consectetur adipiscing
        </Text>
        <Button w="100%" onClick={onOpenProceed}>
          Proceed
        </Button>
      </Box>

      <Backdrop isOpen={isProceedOpen}>
        <ProceedModal
          text="You are about to take a permanent step that cannot be undone."
          isLoading={false}
          handleProceed={handleProceed}
          handleClose={onCloseProceed}
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
      </Backdrop>
    </>
  );
}

export default Trustline;
