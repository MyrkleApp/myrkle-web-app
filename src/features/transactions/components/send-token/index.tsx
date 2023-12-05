import Button from "@/components/button";
import Input from "@/components/input";
import { MotionBox } from "@/components/motion-elements";
import QrCodeIcon from "@/icons/qr-code";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";
import { Flex, Grid, GridItem, HStack, Square, SimpleGrid, Text, Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AssetsDropdown from "../assets-dropdown";
import {
  useLazyGetBalanceQuery,
  useSendTokenMutation,
  useSendXrpMutation,
} from "@/features/shared/redux/xrp.api";
import { formatNumber, isXrpToken } from "@/helpers";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";
import { numbersOnlyRegex, xrpIssuer } from "@/constants";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { IToken, TTxnPipeline } from "@/features/shared/types";
import { useSearchParams } from "react-router-dom";
import AddressBook from "../address-book";
import Backdrop from "@/components/backdrop";
import ResponseModal from "@/components/response-modal";
import MyrkleLoader from "@/components/myrkle-loader";
import XummTxnModal from "@/components/xumm-txn-modal";
import { ISendToken, ISendXrp } from "@/features/shared/types/xrp-mutations";
import TransferFee from "../transfer-fee";

function SendToken() {
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get("token");
  const urlIssuer = searchParams.get("issuer");

  const [selectedToken, setSelectedToken] = useState<Omit<IToken, "icon">>({
    token: "xrp",
    issuer: xrpIssuer,
  });
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isAdvancedOptions, setAdvancedOptions] = useState(false);
  const [note, setNote] = useState("");
  const [destinationTag, setDestinationTag] = useState("");
  const [view, setView] = useState<TTxnPipeline>("default");

  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn("token");

  // ===========================================================================================
  // selectors
  // ===========================================================================================

  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  // ===========================================================================================
  // api
  // ===========================================================================================

  const [sendXrp] = useSendXrpMutation();
  const [sendToken] = useSendTokenMutation();
  const [getXrpBalance] = useLazyGetBalanceQuery();

  // ===========================================================================================
  // effects
  // ===========================================================================================

  useEffect(() => {
    getXrpBalance({ address, net }, true)
      .unwrap()
      .then((res) => setSelectedToken((prevData) => ({ ...prevData, balance: res.balance })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (urlToken && urlIssuer) {
      setSelectedToken({
        token: urlToken,
        issuer: urlIssuer,
      });
    }
  }, [urlIssuer, urlToken]);

  // ===========================================================================================
  // handlers
  // ===========================================================================================

  const handleSelectedToken = (token: Omit<IToken, "icon">) => setSelectedToken(token);

  const toggleAdvancedOptions = () => {
    if (isAdvancedOptions) setAdvancedOptions(false);
    else setAdvancedOptions(true);
  };

  const handleSendAsset = () => {
    setView("loading");

    if (isXrpToken(selectedToken)) {
      const sendXrpBody: ISendXrp = {
        sender_addr: address,
        receiver_addr: receiverAddress,
        amount,
      };

      if (destinationTag) sendXrpBody.destination_tag = destinationTag;
      if (note.trim().length) sendXrpBody.memo = note;

      sendXrp(sendXrpBody)
        .unwrap()
        .then((res) => {
          handleSubmitTxn(res);
        })
        .catch(() => setView("error-1"));
    } else {
      const sendTokenBody: ISendToken = {
        sender_addr: address,
        receiver_addr: receiverAddress,
        token: selectedToken.token,
        issuer: selectedToken.issuer,
        amount,
      };
      if (destinationTag) sendTokenBody.destination_tag = destinationTag;
      if (note.trim().length) sendTokenBody.memo = note;

      sendToken(sendTokenBody)
        .unwrap()
        .then((res) => {
          const successCallback = () => setView("success");
          const errorCallback = () => setView("error-2");
          handleSubmitTxn(res, successCallback, errorCallback);
        })
        .catch(() => setView("error-1"));
    }
  };

  const handleReset = () => {
    resetSubmitTxnResponse();
    setView("default");
    setReceiverAddress("");
    setAmount("");
    setNote("");
    setDestinationTag("");
    setSelectedToken({
      token: "xrp",
      issuer: xrpIssuer,
    });
  };

  const handleAddress = (address: string) => {
    setReceiverAddress(address);
  };

  return (
    <>
      <Text color="textDark" fontSize="sm" fontWeight="bold" pos="absolute" top="13%">
        Name
      </Text>
      <TransferFee token={selectedToken.token} issuer={selectedToken.issuer} amount={amount} />
      <Flex
        h="9%"
        justify="space-between"
        align="center"
        p="5px"
        bg="secondary"
        borderRadius="7px"
        pos="absolute"
        top="20%"
        w="100%"
      >
        <Box h="100%" w="150px" pos="relative">
          <AssetsDropdown selectedToken={selectedToken} handleSelectedToken={handleSelectedToken} />
        </Box>
        <Input
          w="calc(100% - 150px)"
          h="100%"
          textAlign="right"
          placeholder="0"
          border="none"
          value={amount}
          onChange={(e: any) => e.target.value.match(numbersOnlyRegex) && setAmount(e.target.value)}
        />
      </Flex>
      <HStack pos="absolute" right={0} top="30%">
        <Text fontSize="xs">Balance:</Text>
        <Flex
          alignItems="center"
          justify="flex-end"
          border="1px solid"
          borderColor="secondary"
          borderRadius="20px"
          minW="150px"
          px={2}
        >
          <Text fontSize="xs">{formatNumber(selectedToken?.balance || "-- --")}</Text>
        </Flex>
      </HStack>

      <Text color="textDark" fontSize="sm" fontWeight="bold" pos="absolute" top="34%">
        Recipient Address
      </Text>
      <Input
        h="9%"
        bg="secondary"
        borderRadius="7px"
        pos="absolute"
        top="41%"
        w="100%"
        value={receiverAddress}
        onChange={(e: any) => setReceiverAddress(e.target.value)}
      />

      <Grid templateColumns="repeat(12, 1fr)" pos="absolute" top="55%">
        <GridItem colSpan={5}>
          <HStack>
            <Square bg="secondary" size="50px" borderRadius="10px">
              <QrCodeIcon fontSize="2xl" />
            </Square>
            <Text color="textDark" fontSize="sm" fontWeight="bold">
              Scan code
            </Text>
          </HStack>
        </GridItem>
        <GridItem colSpan={5}>
          <AddressBook handleAddress={handleAddress} />
        </GridItem>
      </Grid>

      <MotionBox
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        pos="absolute"
        w="100%"
        initial={{ top: "70%" }}
        animate={{
          top: isAdvancedOptions ? "66%" : "70%",
          transition: { type: "spring", stiffness: 150 },
        }}
      >
        <HStack cursor="pointer" onClick={toggleAdvancedOptions}>
          <ThickArrowDownIcon color="#fff" fontSize="sm" />
          <Text color="#fff" fontSize="sm" fontWeight="bold">
            Advanced options
          </Text>
        </HStack>
      </MotionBox>

      <AnimatePresence>
        {isAdvancedOptions && (
          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SimpleGrid columns={2} h="9%" pos="absolute" top="72%" spacing={3}>
              <Box>
                <Text color="textDark" fontSize="sm" fontWeight="bold">
                  Note
                </Text>
                <Input
                  h="85%"
                  bg="secondary"
                  borderRadius="7px"
                  w="100%"
                  value={note}
                  onChange={(e: any) => setNote(e.target.value)}
                />
              </Box>
              <Box>
                <Text color="textDark" fontSize="sm" fontWeight="bold">
                  Destination Tag
                </Text>
                <Input
                  h="85%"
                  bg="secondary"
                  borderRadius="7px"
                  w="100%"
                  value={destinationTag}
                  onChange={(e: any) =>
                    e.target.value.match(numbersOnlyRegex) && setDestinationTag(e.target.value)
                  }
                />
              </Box>
            </SimpleGrid>
          </MotionBox>
        )}
      </AnimatePresence>

      <MotionBox
        pos="absolute"
        w="100%"
        h="9%"
        initial={{ bottom: "7%" }}
        animate={{
          bottom: isAdvancedOptions ? 0 : "7%",
          transition: { type: "spring", stiffness: 150 },
        }}
      >
        <Button
          bg={amount && receiverAddress ? "primary" : "secondary"}
          letterSpacing={1}
          w="100%"
          h="100%"
          isDisabled={!amount || !receiverAddress}
          onClick={handleSendAsset}
        >
          confirm
        </Button>
      </MotionBox>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}
        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "xumm-qr-code" && (
          <XummTxnModal qrCodeImage={xummTxnQrCode} handleClose={handleReset} />
        )}
        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default SendToken;
