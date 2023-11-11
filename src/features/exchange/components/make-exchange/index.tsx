import Button from "@/components/button";
import ExchangeIcon from "@/icons/exchange";
import { Box, Circle, Flex, HStack, Spacer, Switch, Text, useDisclosure } from "@chakra-ui/react";
import ExchangeBox from "../exchange-box";
import { numbersOnlyRegex } from "@/constants";
import { IToken, TTxnPipeline } from "@/features/shared/types";
import { useEffect, useState } from "react";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useDispatch, useSelector } from "react-redux";
import { useOrderBookSwapMutation } from "@/features/shared/redux/xrp.api";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import TxnDetailsModal from "../txn-details-modal";
import Backdrop from "@/components/backdrop";
import { selectExchangeType, selectFromToken, selectToToken } from "../../redux/exchange.selectors";
import { useSearchParams } from "react-router-dom";
import xrpLogo from "@/assets/xrp-logo.svg";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import { cleanupRate, isXrpToken } from "@/helpers";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";
import { setFromToken, setToToken } from "../../redux/exchange.slice";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";

function MakeExchange() {
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get("token");
  const urlIssuer = searchParams.get("issuer");

  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn();

  const { isOpen: isOptionsOpen, onToggle: onToggleOptions } = useDisclosure();

  // ============================================================================================
  // selectors
  // ============================================================================================

  const address = useSelector(selectAddress);
  const exchangeType = useSelector(selectExchangeType);

  const fromToken = useSelector(selectFromToken);
  const toToken = useSelector(selectToToken);

  // ============================================================================================
  // dispatch
  // ============================================================================================

  const dispatch = useDispatch();
  const _setFromToken = (data: IToken) => dispatch(setFromToken(data));
  const _setToToken = (data: IToken) => dispatch(setToToken(data));

  // ============================================================================================
  // state
  // ============================================================================================

  const [fromTokenAmount, setFromTokenAmount] = useState("");
  const [toTokenAmount, setToTokenAmount] = useState("");
  const [tfSell, setTfSell] = useState(false);
  const [tfImmediateOrCancel, setTfImmediateOrCancel] = useState(false);
  const [tfFillOrKill, setTfFillOrKill] = useState(false);
  const [tfPassive, setTfPassive] = useState(false);
  const [view, setView] = useState<TTxnPipeline | "success-1">("default");

  const isSameToken = fromToken.token === toToken.token && fromToken.issuer === toToken.issuer;

  // ============================================================================================
  // api
  // ============================================================================================

  const [orderBookSwap, { data: orderBookSwapData, isLoading: isOrderBookSwapLoading }] =
    useOrderBookSwapMutation();

  // ============================================================================================
  // effects
  // ============================================================================================

  useEffect(() => {
    if (urlToken && urlIssuer) {
      _setFromToken({
        token: urlToken,
        issuer: urlIssuer,
        icon: isXrpToken({ token: urlToken, issuer: urlIssuer }) ? xrpLogo : tokenPlaceholder,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlIssuer, urlToken]);

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

  // ============================================================================================
  // handlers
  // ============================================================================================

  const handleFromToken = (token: IToken) => {
    _setFromToken(token);
  };

  const handleToToken = (token: IToken) => {
    _setToToken(token);
  };

  const handleFlipTokens = () => {
    const newFromToken = { ...toToken };
    const newToToken = { ...fromToken };
    _setFromToken(newFromToken);
    _setToToken(newToToken);
    setFromTokenAmount("");
    setToTokenAmount("");
  };

  const handleConfirmClick = () => {
    setView("loading");

    orderBookSwap({
      sender_addr: address,
      buy_type: toToken.token,
      sell_type: fromToken.token,
      buy_amount: toTokenAmount,
      sell_amount: fromTokenAmount,
      buy_issuer: toToken.issuer,
      sell_issuer: fromToken.issuer,
      tf_sell: tfSell,
      tf_fill_or_kill: tfFillOrKill,
      tf_immediate_or_cancel: tfImmediateOrCancel,
    })
      .unwrap()
      .then(() => {
        setView("success-1");
      })
      .catch(() => setView("error-1"));
  };

  const handleProceed = () => {
    setView("loading");

    if (exchangeType === "swap") {
      handleSubmitTxn(orderBookSwapData);
    }
  };

  const handleReset = () => {
    resetSubmitTxnResponse();
    setView("default");
  };

  return (
    <>
      <Box h="calc(100% - 130px)" overflow="hidden auto" mt={4} pr={1}>
        <Box h="35%">
          <Text color="textDark" fontSize="xs" fontWeight="bold">
            From
          </Text>
          <Box h="calc(100% - 20px)">
            <ExchangeBox
              token={fromToken}
              handleToken={handleFromToken}
              amount={fromTokenAmount}
              handleAmount={(e: any) =>
                e.target.value.match(numbersOnlyRegex) && setFromTokenAmount(e.target.value)
              }
            />
          </Box>
        </Box>

        <Flex justify="center" align="center" h="20%">
          <Circle
            bg="secondary"
            size="22px"
            cursor="pointer"
            transform="rotate(90deg)"
            onClick={handleFlipTokens}
          >
            <ExchangeIcon stroke="gray" fill="none" />
          </Circle>
        </Flex>

        <Box h="35%">
          <Text color="textDark" fontSize="xs" fontWeight="bold">
            To
          </Text>
          <Box h="calc(100% - 20px)">
            <ExchangeBox
              token={toToken}
              handleToken={handleToToken}
              amount={toTokenAmount}
              handleAmount={(e: any) =>
                e.target.value.match(numbersOnlyRegex) && setToTokenAmount(e.target.value)
              }
            />
          </Box>
        </Box>

        {exchangeType === "swap" && (
          <HStack>
            <Text fontSize="xs">
              {cleanupRate(Number(fromTokenAmount) / Number(toTokenAmount))}
            </Text>
            <Spacer />
            <HStack cursor="pointer" onClick={onToggleOptions}>
              <ThickArrowDownIcon color="#fff" fontSize="xs" />
              <Text color="#fff" fontSize="sm">
                Options
              </Text>
            </HStack>
          </HStack>
        )}

        {isOptionsOpen && exchangeType === "swap" && (
          <Box mt={3}>
            <HStack mb={2}>
              <Text fontSize="xs">tfSell</Text>
              <Spacer />
              <Switch
                size="sm"
                colorScheme="whatsapp"
                isChecked={tfSell}
                onChange={() => setTfSell(!tfSell)}
              />
            </HStack>
            <HStack mb={2}>
              <Text fontSize="xs">tfImmediate_or_cancel</Text>
              <Spacer />
              <Switch
                size="sm"
                colorScheme="whatsapp"
                isChecked={tfImmediateOrCancel}
                onChange={() => setTfImmediateOrCancel(!tfImmediateOrCancel)}
              />
            </HStack>
            <HStack>
              <Text fontSize="xs">tf Fill_or_kill</Text>
              <Spacer />
              <Switch
                size="sm"
                colorScheme="whatsapp"
                isChecked={tfFillOrKill}
                onChange={() => setTfFillOrKill(!tfFillOrKill)}
              />
            </HStack>
          </Box>
        )}

        {exchangeType === "liquidity" && (
          <HStack>
            <Text fontSize="xs">tfPassive</Text>
            <Spacer />
            <Switch
              size="sm"
              colorScheme="whatsapp"
              isChecked={tfPassive}
              onChange={() => setTfPassive(!tfPassive)}
            />
          </HStack>
        )}
      </Box>

      <Button
        bg={!fromTokenAmount || !toTokenAmount || isSameToken ? "secondary" : "primary"}
        w="100%"
        pos="absolute"
        bottom="3%"
        isDisabled={!fromTokenAmount || !toTokenAmount || isSameToken}
        isLoading={isOrderBookSwapLoading}
        onClick={handleConfirmClick}
      >
        confirm
      </Button>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}
        {view === "success-1" && (
          <TxnDetailsModal
            handleClose={handleReset}
            handleProceed={handleProceed}
            fromTokenName={fromToken.token}
            fromTokenIssuer={fromToken.issuer}
            fromTokenIcon={fromToken.icon}
            fromTokenAmount={fromTokenAmount}
            toTokenName={toToken.token}
            toTokenIssuer={toToken.issuer}
            toTokenIcon={toToken.icon}
            toTokenAmount={toTokenAmount}
          />
        )}
        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "xumm-qr-code" && <XummTxnModal qrCodeImage={xummTxnQrCode} />}
        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default MakeExchange;
