import Button from "@/components/button";
import Input from "@/components/input";
import { MotionBox } from "@/components/motion-elements";
import ArrowLeftIcon from "@/icons/arrow-left";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";
import TokenListIcon from "@/icons/token-list";
import {
  Box,
  HStack,
  InputGroup,
  InputRightElement,
  Spacer,
  Square,
  Switch,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TAddTokenModalType } from "@/features/wallet/types";
import { IToken, TTxnPipeline } from "../../types";
import { useAddTokenMutation } from "../../redux/xrp.api";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";
import useSubmitTxn from "../../hooks/use-submit-txn";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";

export interface AddTokenFormModalProps {
  handleClose: () => void;
  handleTokenListIconClick: (type: TAddTokenModalType) => void;
  token: IToken | null;
}

function AddTokenFormModal({
  handleClose,
  handleTokenListIconClick,
  token,
}: AddTokenFormModalProps) {
  const [view, setView] = useState<TTxnPipeline>("default");
  const [tokenName, setTokenName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [rippling, setRippling] = useState(false);

  const ref = useRef(null);

  const address = useSelector(selectAddress);

  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn();

  const [addToken, { isLoading }] = useAddTokenMutation();

  useOutsideClick({
    ref,
    handler: () => {
      if (view === "loading") return;
      handleClose();
    },
  });

  useEffect(() => {
    if (token) {
      setTokenName(token.token);
      setIssuer(token.issuer);
    }
  }, [token]);

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

  const handleAdvancedOptionsClick = () => {
    if (showAdvancedOptions) setShowAdvancedOptions(false);
    else setShowAdvancedOptions(true);
  };

  const handleConfirm = () => {
    setView("loading");

    addToken({
      sender_addr: address,
      token: tokenName,
      issuer,
      rippling,
      is_lp_token: false,
      fee: "0",
    })
      .unwrap()
      .then((res) => {
        const successCallback = () => setView("success");
        const errorCallback = () => setView("error-2");
        handleSubmitTxn(res, successCallback, errorCallback);
      })
      .catch(() => setView("error-1"));
  };

  const handleReset = () => {
    handleClose();
    resetSubmitTxnResponse();
  };

  if (view !== "default") {
    return (
      <>
        {view === "loading" && <MyrkleLoader />}

        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}

        {view === "xumm-qr-code" && <XummTxnModal qrCodeImage={xummTxnQrCode} />}

        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}

        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </>
    );
  }

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="370px"
      w="350px"
      p={4}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        height: showAdvancedOptions ? "440px" : "370px",
      }}
      exit={{ opacity: 0 }}
    >
      <HStack spacing={5} pl={3} pt={2} mb={8}>
        <ArrowLeftIcon cursor="pointer" onClick={handleClose} />
        <Text fontSize="sm" fontWeight="bold">
          Add Token
        </Text>
      </HStack>

      <MotionBox
        px={4}
        mt={1}
        // border="1px solid red"
        height="260px"
        pos="relative"
        initial={{ height: "260px" }}
        animate={{ height: showAdvancedOptions ? "330px" : "260px" }}
      >
        <HStack mb={3}>
          <Text fontSize="2xs" color="textDark" fontWeight="bold">
            Token name
          </Text>
          {/* info component goes here */}
        </HStack>
        <InputGroup>
          <Input
            mb={5}
            pr={10}
            value={tokenName}
            onChange={(e: any) => setTokenName(e.target.value)}
          />
          <InputRightElement>
            <Square
              bg="#535353"
              size="30px"
              borderRadius="5px"
              cursor="pointer"
              onClick={() => handleTokenListIconClick("select-token")}
            >
              <TokenListIcon fill="none" />
            </Square>
          </InputRightElement>
        </InputGroup>

        <HStack mb={3}>
          <Text fontSize="2xs" color="textDark" fontWeight="bold">
            Issuer
          </Text>
          {/* info component goes here */}
        </HStack>
        <Input mb={5} value={issuer} onChange={(e: any) => setIssuer(e.target.value)} />

        <HStack justify="flex-end" mb={1}>
          <HStack cursor={"pointer"} onClick={handleAdvancedOptionsClick}>
            <ThickArrowDownIcon color={"#fff"} fontSize="sm" />
            <Text fontSize="sm" fontWeight="bold" color={"#fff"}>
              Advanced options
            </Text>
          </HStack>
        </HStack>

        <AnimatePresence>
          {showAdvancedOptions && (
            <MotionBox
              mb={5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              {/* <HStack mb={3}>
                <Text fontSize="2xs" color="textDark" fontWeight="bold">
                  Limit
                </Text>
              </HStack>
              <Input mb={3} /> */}

              <HStack mb={3}>
                <Text fontSize="2xs" color="textDark" fontWeight="bold">
                  Rippling
                </Text>
                <Spacer />
                <Switch
                  colorScheme="whatsapp"
                  isChecked={rippling}
                  onChange={() => setRippling((prev) => !prev)}
                />
              </HStack>
            </MotionBox>
          )}
        </AnimatePresence>

        <Box pos="absolute" bottom={0} left={0} w="100%" px="inherit">
          <Button
            w="100%"
            h="40px"
            bg="secondary"
            color="textDark"
            isLoading={isLoading}
            onClick={handleConfirm}
          >
            confirm
          </Button>
        </Box>
      </MotionBox>
    </MotionBox>
  );
}

export default AddTokenFormModal;
