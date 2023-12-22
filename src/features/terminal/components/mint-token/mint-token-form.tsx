import Button from "@/components/button";
import Input from "@/components/input";
import { Box, Flex, HStack, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import ProceedModal from "@/features/shared/components/proceed-modal";
import Backdrop from "@/components/backdrop";
import { numbersOnlyRegex } from "@/constants";
import PlusMinus from "../plus-minus";
import { useAccountSetIssuerMutation } from "@/features/shared/redux/xrp.api";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TTxnPipeline } from "@/features/shared/types";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { TMintTokenStep } from "../../types";
import DialogBox from "@/components/dialog-box";
import MintTokenProgress from "./mint-token-progress";

const getTickSize = (i: number) => (i <= 0 ? 0 : i + 2);

export interface MintTokenFormProps {
  // handleConfirmClick: () => void;
  tokenName: string;
  amount: string;
  tickSize: null | number;
  totalSupply: string;
  domain: string;
  transferFee: string;
  handleTokenName: (val: string) => void;
  handleAmount: (val: string) => void;
  handleTickSize: (val: number) => void;
  handleTotalSupply: (val: string) => void;
  handleDomain: (val: string) => void;
  handleTransferFee: (val: string) => void;
  handleMintTokenStep: (val: TMintTokenStep) => void;
}

function MintTokenForm({
  tokenName,
  amount,
  tickSize,
  totalSupply,
  domain,
  transferFee,
  handleTokenName,
  handleAmount,
  handleTickSize,
  handleTotalSupply,
  handleDomain,
  handleTransferFee,
  handleMintTokenStep,
}: MintTokenFormProps) {
  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("token");

  const { isOpen: isWarningOpen, onOpen: onOpenWarning, onClose: onCloseWarning } = useDisclosure();
  const { isOpen: isProceedOpen, onOpen: onOpenProceed, onClose: onCloseProceed } = useDisclosure();

  const address = useSelector(selectAddress);

  const [view, setView] = useState<TTxnPipeline>("default");

  const [accountSetIssuer] = useAccountSetIssuerMutation();

  // ===========================================================================================
  // effects
  // ===========================================================================================

  useEffect(() => {
    if (xummTxnQrCode) {
      setView("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      handleMintTokenStep("manager");
    } else setView("error-2");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitTxnSuccess]);

  useEffect(() => {
    onOpenWarning();
  }, [onOpenWarning]);

  // ===========================================================================================
  // handlers
  // ===========================================================================================

  const handleRoyaltiesPlusIconClick = () => {
    if (Number(transferFee) >= 50) return;
    handleTransferFee(Number(Number(transferFee) + 0.01).toFixed(2));
  };

  const handleRoyaltiesMinusIconClick = () => {
    if (Number(transferFee) <= 0) return;
    handleTransferFee(Number(Number(transferFee) - 0.01).toFixed(2));
  };

  const handleRoyaltiesChange = (e: any) => {
    if (!e.target.value.match(numbersOnlyRegex)) return;
    if (Number(e.target.value) > 50) return;
    handleTransferFee(e.target.value);
  };

  const handleConfirmClick = () => {
    onOpenProceed();
  };

  const handleAccountSetIssuer = () => {
    setView("loading");
    onCloseProceed();

    accountSetIssuer({
      issuer_addr: address,
      ticksize: String(tickSize),
      transferfee: transferFee,
      domain,
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
      <MintTokenProgress currentStep={1} />
      <Flex direction="column" justify="space-between" minH="100%" pr={2}>
        <Box>
          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Token name
            </Text>
          </HStack>
          <Input mb={5} value={tokenName} onChange={(e: any) => handleTokenName(e.target.value)} />

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Amount
            </Text>
          </HStack>
          <Input
            mb={5}
            value={amount}
            onChange={(e: any) =>
              e.target.value.match(numbersOnlyRegex) && handleAmount(e.target.value)
            }
          />

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Tick Size
            </Text>
          </HStack>
          <SimpleGrid
            bg="secondary"
            p={2}
            borderRadius="5px"
            columns={[6, null, null, 8]}
            spacing={2}
            mb={5}
          >
            {Array(14)
              .fill(null)
              .map((_, i) => (
                <Button
                  key={i}
                  w="100%"
                  aspectRatio={1}
                  bg={tickSize === i + 1 ? "primary" : "#585858"}
                  borderRadius="5px"
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{
                    bg: tickSize === i + 1 ? "primary" : "#585858",
                  }}
                  onClick={() => handleTickSize(i + 1)}
                >
                  {getTickSize(i)}
                </Button>
              ))}
          </SimpleGrid>

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Transfer fee
            </Text>
          </HStack>
          <HStack mb={5}>
            <PlusMinus
              value={transferFee}
              handlePlusClick={handleRoyaltiesPlusIconClick}
              handleMinusClick={handleRoyaltiesMinusIconClick}
              handleInputChange={handleRoyaltiesChange}
            />
            <Text fontSize="sm" fontWeight="bold">
              %
            </Text>
          </HStack>

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Domain
            </Text>
          </HStack>
          <Input mb={5} value={domain} onChange={(e: any) => handleDomain(e.target.value)} />

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Total Supply
            </Text>
          </HStack>
          <Input
            mb={10}
            value={totalSupply}
            onChange={(e: any) =>
              e.target.value.match(numbersOnlyRegex) && handleTotalSupply(e.target.value)
            }
          />
        </Box>

        <Box>
          <Button w="100%" onClick={handleConfirmClick}>
            confirm
          </Button>
        </Box>
      </Flex>

      <Backdrop isOpen={isWarningOpen}>
        <DialogBox
          message="lorem ipsum dolor sit amet, consectetur adipiscing elit"
          handleClose={onCloseWarning}
        />
      </Backdrop>

      <Backdrop isOpen={isProceedOpen}>
        <ProceedModal
          text="You are about to take a permanent step that cannot be undone."
          isLoading={false}
          handleProceed={handleAccountSetIssuer}
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
        {/* {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />} */}
      </Backdrop>
    </>
  );
}

export default MintTokenForm;
