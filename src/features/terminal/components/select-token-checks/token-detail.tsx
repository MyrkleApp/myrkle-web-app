import Button from "@/components/button";
import Input from "@/components/input";
import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
import { Box } from "@chakra-ui/react";
import TokenItem from "../select-token-dropdown/token-item";
import { useEffect, useState } from "react";
import { numbersOnlyRegex, today } from "@/constants";
import {
  useCreateTokenCheckMutation,
  useCreateXrpCheckMutation,
} from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { isXrpToken } from "@/helpers";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { TTxnPipeline } from "@/features/shared/types";
import Backdrop from "@/components/backdrop";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";

export interface TokenDetailProps {
  token: any;
  handleTokenClick: () => void;
}

// wallet address 2 ====>>>  r4W82KKuXBbFTKJrJDiTkfaAnzz3SdBms9

function TokenDetail({ token, handleTokenClick }: TokenDetailProps) {
  const address = useSelector(selectAddress);

  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [view, setView] = useState<TTxnPipeline>("default");

  const isSubmitDisabled = !receiverAddress.trim().length || !amount.trim().length || !expiryDate;

  const [createTokenCheck] = useCreateTokenCheckMutation();
  const [createXrpCheck] = useCreateXrpCheckMutation();

  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("check");

  useEffect(() => {
    if (xummTxnQrCode) {
      setView("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      setView("success");
    } else setView("error-2");
  }, [isSubmitTxnSuccess]);

  const handleConfirm = () => {
    setView("loading");

    const timeNow = new Date().toISOString().split("T")[1].split(".")[0];

    if (isXrpToken(token)) {
      createXrpCheck({
        sender_addr: address,
        receiver_addr: receiverAddress,
        amount,
        expiry_date: `${expiryDate}T${timeNow}`,
      })
        .unwrap()
        .then((res) => handleSubmitTxn(res))
        .catch(() => setView("error-1"));
      return;
    }
    createTokenCheck({
      sender_addr: address,
      receiver_addr: receiverAddress,
      token: token?.token,
      issuer: token?.issuer,
      amount,
      expiry_date: `${expiryDate}T${timeNow}`,
    })
      .unwrap()
      .then((res) => handleSubmitTxn(res))
      .catch(() => setView("error-1"));
  };

  const handleReset = () => {
    setView("default");
    resetSubmitTxnResponse();
    setReceiverAddress("");
    setAmount("");
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
          <TokenItem token={token} handleClick={handleTokenClick} useUrlTokenBalance />
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
          <Input
            value={amount}
            onChange={(e: any) =>
              e.target.value.match(numbersOnlyRegex) && setAmount(e.target.value)
            }
          />
        </Box>
        <Box mb={3}>
          <ItemLabel title="Expiry Date" mb={1} />
          <Input
            type="date"
            min={today}
            value={expiryDate}
            onChange={(e: any) => setExpiryDate(e.target.value)}
            sx={{
              "::-webkit-calendar-picker-indicator": {
                filter: "invert(1)",
              },
            }}
          />
        </Box>

        <Button
          w="100%"
          onClick={handleConfirm}
          color="#fff"
          bg={isSubmitDisabled ? "secondary" : "primary"}
          isDisabled={isSubmitDisabled}
        >
          confirm
        </Button>

        {/* <Box p={3} bg="darkest" borderRadius="20px">
          <HStack mb={4}>
            <Text fontSize="xs">Transaction fee</Text>
            <Spacer />
            <Text fontSize="xs">1.00</Text>
          </HStack>
          <Button
            w="100%"
            onClick={handleConfirm}
            color="#fff"
            bg={isSubmitDisabled ? "secondary" : "primary"}
            isDisabled={isSubmitDisabled}
          >
            confirm
          </Button>
        </Box> */}
      </MotionBox>

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

export default TokenDetail;
