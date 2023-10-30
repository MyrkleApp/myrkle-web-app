import Button from "@/components/button";
import Input from "@/components/input";
import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
import { Box, Flex, HStack, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import Backdrop from "@/components/backdrop";
import GenerateProtedtedEscrowModal from "./generate-protected-escrow-modal";
import { createPortal } from "react-dom";
import TokenItem from "../select-token-dropdown/token-item";
import { useEffect, useState } from "react";
import { useCreateXrpEscrowMutation } from "@/features/shared/redux/xrp.api";
import { isXrpToken } from "@/helpers";
import { useSelector } from "react-redux";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { TTxnPipeline } from "@/features/shared/types";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";

export interface TokenDetailProps {
  token: any;
}

function TokenDetail({ token }: TokenDetailProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useSelector(selectAddress);

  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [claimDate, setClaimDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [view, setView] = useState<TTxnPipeline>("default");

  const [createXrpEscrow] = useCreateXrpEscrowMutation();

  const [{ isSubmitTxnSuccess }, { handleSubmitTxn, resetSubmitTxnResponse }] = useSubmitTxn();

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      setView("success");
    } else setView("error-2");
  }, [isSubmitTxnSuccess]);

  const handleConfirm = () => {
    if (!isXrpToken(token)) return;

    setView("loading");

    createXrpEscrow({
      sender_addr: address,
      amount: Number(amount),
      receiver_addr: receiverAddress,
      claim_date: claimDate,
      expiry_date: expiryDate,
      condition: "hello world",
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
    setReceiverAddress("");
    setAmount("");
    setClaimDate("");
    setExpiryDate("");
  };

  return (
    <>
      <MotionBox
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        h="100%"
        pr={1}
        overflow="hidden auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Box>
          <ItemLabel title="Token" mb={1} />
          <TokenItem token={token} />
        </Box>
        <Box mb={2}>
          <ItemLabel title="Receiver address" mb={1} />
          <Input
            value={receiverAddress}
            onChange={(e: any) => setReceiverAddress(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <ItemLabel title="Amount" mb={1} />
          <Input value={amount} onChange={(e: any) => setAmount(e.target.value)} />
        </Box>
        <Box mb={2}>
          <ItemLabel title="Claim Date" mb={1} />
          <Input
            type="date"
            value={claimDate}
            onChange={(e: any) => setClaimDate(e.target.value)}
            sx={{
              "::-webkit-calendar-picker-indicator": {
                filter: "invert(1)",
                cursor: "pointer",
              },
            }}
          />
        </Box>
        <Box mb={3}>
          <ItemLabel title="Expiry Date" mb={1} />
          <Input
            type="date"
            value={expiryDate}
            onChange={(e: any) => setExpiryDate(e.target.value)}
            sx={{
              "::-webkit-calendar-picker-indicator": {
                filter: "invert(1)",
                cursor: "pointer",
              },
            }}
          />
        </Box>
        <Flex justify="center" mb={3}>
          <Button h="35px" borderRadius="30px" px={10} onClick={onOpen}>
            Generate Protected Escrow
          </Button>
        </Flex>

        <Box p={3} bg="darkest" borderRadius="20px">
          <HStack mb={4}>
            <Text fontSize="xs">Transaction fee</Text>
            <Spacer />
            <Text fontSize="xs">1.00</Text>
          </HStack>
          <Button w="100%" onClick={handleConfirm}>
            confirm
          </Button>
        </Box>
      </MotionBox>

      {isOpen &&
        createPortal(
          <Backdrop isOpen={isOpen}>
            <GenerateProtedtedEscrowModal handleClose={onClose} />
          </Backdrop>,
          document.body,
        )}

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}
        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default TokenDetail;
