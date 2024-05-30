import Button from "@/components/button";
import ExchangeIcon from "@/icons/exchange";
import { Box, Circle, Flex, HStack, Spacer, Switch, Text, useDisclosure } from "@chakra-ui/react";
import ExchangeBox from "../exchange-box";
import { numbersOnlyRegex, xrpToken } from "@/constants";
import { IToken, TTxnPipeline } from "@/features/shared/types";
import { useEffect, useRef, useState } from "react";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  useOrderBookLiquidityMutation,
  useOrderBookSwapMutation,
} from "@/features/shared/redux/xrp.api";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import TxnDetailsModal from "../txn-details-modal";
import Backdrop from "@/components/backdrop";
import {
  selectExchangeType,
  selectFromToken,
  selectTfFillOrKill,
  selectTfImmediateOrCancel,
  selectTfSell,
  selectToToken,
} from "../../redux/exchange.selectors";
import { useSearchParams } from "react-router-dom";
import xrpLogo from "@/assets/xrp-logo.svg";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import { isXrpToken } from "@/helpers";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";
import {
  setFromToken,
  setTfFillOrKill,
  setTfImmediateOrCancel,
  setTfSell,
  setToToken,
} from "../../redux/exchange.slice";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";
import { useLocalStorage } from "react-use";
import ItemDescription from "@/components/item-description";
import { optionsData } from "./data";
import ExternalLinkIcon from "@/icons/external-link";

function MakeExchange() {
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get("token");
  const urlIssuer = searchParams.get("issuer");

  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("exchange");

  const { isOpen: isOptionsOpen, onToggle: onToggleOptions } = useDisclosure();

  // ============================================================================================
  // selectors
  // ============================================================================================

  const address = useSelector(selectAddress);
  const exchangeType = useSelector(selectExchangeType);

  const fromToken = useSelector(selectFromToken);
  const toToken = useSelector(selectToToken);

  const tfSell = useSelector(selectTfSell);
  const tfImmediateOrCancel = useSelector(selectTfImmediateOrCancel);
  const tfFillOrKill = useSelector(selectTfFillOrKill);

  // ============================================================================================
  // dispatch
  // ============================================================================================

  const dispatch = useDispatch();
  const _setFromToken = (data: IToken) => dispatch(setFromToken(data));
  const _setToToken = (data: IToken) => dispatch(setToToken(data));
  const _setTfSell = (value: boolean) => dispatch(setTfSell(value));
  const _setTfImmediateOrCancel = (value: boolean) => dispatch(setTfImmediateOrCancel(value));
  const _setTfFillOrKill = (value: boolean) => dispatch(setTfFillOrKill(value));

  // ============================================================================================
  // state & local storage & ref
  // ============================================================================================

  const [fromTokenAmount, setFromTokenAmount] = useState("");
  const [toTokenAmount, setToTokenAmount] = useState("");
  const [tfPassive, setTfPassive] = useState(true);
  const [view, setView] = useState<TTxnPipeline | "success-1">("default");

  const isSameToken = fromToken.token === toToken.token && fromToken.issuer === toToken.issuer;

  const [localTfSell, storeTfSell] = useLocalStorage<boolean>("tfSell");
  const [localTfImmediateOrCancel, storeTfImmediateOrCancel] =
    useLocalStorage<boolean>("tfImmediateOrCancel");
  const [localTfFillOrKill, storeTfFillOrKill] = useLocalStorage<boolean>("tfFillOrKill");

  const containerRef = useRef(null);

  // ============================================================================================
  // api
  // ============================================================================================

  const [orderBookSwap, { data: orderBookSwapData }] = useOrderBookSwapMutation();
  const [orderBookLiquidity, { data: orderBookLiquidityData }] = useOrderBookLiquidityMutation();

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

  useEffect(() => {
    _setTfSell(!!localTfSell);
    _setTfImmediateOrCancel(!!localTfImmediateOrCancel);
    _setTfFillOrKill(!!localTfFillOrKill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    if (exchangeType === "swap") {
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
    }

    if (exchangeType === "liquidity") {
      orderBookLiquidity({
        sender_addr: address,
        buy_type: toToken.token,
        sell_type: fromToken.token,
        buy_amount: toTokenAmount,
        sell_amount: fromTokenAmount,
        buy_issuer: toToken.issuer,
        sell_issuer: fromToken.issuer,
      })
        .unwrap()
        .then(() => {
          setView("success-1");
        })
        .catch(() => setView("error-1"));
    }
  };

  const handleProceed = () => {
    setView("loading");

    if (exchangeType === "swap") {
      handleSubmitTxn(orderBookSwapData);
    } else {
      handleSubmitTxn(orderBookLiquidityData);
    }
  };

  const handleReset = () => {
    resetSubmitTxnResponse();
    setView("default");
    _setFromToken(xrpToken);
    _setToToken(xrpToken);
    setFromTokenAmount("");
    setToTokenAmount("");
  };

  const handleOptionsClick = () => {
    onToggleOptions();
  };

  return (
    <>
      <Box
        h={["600px", null, null, "calc(100% - 130px)"]}
        overflow="hidden auto"
        // mt={4}
        mt={[4, null, null, null, null, "calc(50% - 250px)"]}
        pr={1}
        // border="1px solid red"
        minH="280px"
        maxH={["400px"]}
      >
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
            {/* <Text fontSize="xs">
              {cleanupRate(Number(fromTokenAmount) / Number(toTokenAmount))}
            </Text> */}
            <Spacer />
            <HStack cursor="pointer" onClick={handleOptionsClick}>
              <ThickArrowDownIcon color="#fff" fontSize="xs" />
              <Text color="#fff" fontSize="sm">
                Options
              </Text>
            </HStack>
          </HStack>
        )}

        {isOptionsOpen && exchangeType === "swap" && (
          <Box mt={3} pb={3}>
            <HStack mb={2}>
              <Text fontSize="xs">tfSell</Text>
              <ItemDescription description={optionsData.tfSell} top={-70} h="100px" />
              <Spacer />
              <Switch
                size="sm"
                colorScheme="whatsapp"
                isChecked={tfSell}
                onChange={() => {
                  _setTfSell(!tfSell);
                  storeTfSell(!tfSell);
                }}
              />
            </HStack>
            <HStack mb={2}>
              <Text fontSize="xs">tfImmediate_or_cancel</Text>
              <ItemDescription description={optionsData.tfImmediateOrCancel} top={-120} h="150px" />
              <Spacer />
              <Switch
                size="sm"
                colorScheme="whatsapp"
                isChecked={tfImmediateOrCancel}
                onChange={() => {
                  _setTfImmediateOrCancel(!tfImmediateOrCancel);
                  storeTfImmediateOrCancel(!tfImmediateOrCancel);
                }}
              />
            </HStack>
            <HStack>
              <Text fontSize="xs">tf Fill_or_kill</Text>
              <ItemDescription description={optionsData.tfFillOrKill} top={-120} />
              <Spacer />
              <Switch
                size="sm"
                colorScheme="whatsapp"
                isChecked={tfFillOrKill}
                onChange={() => {
                  _setTfFillOrKill(!tfFillOrKill);
                  storeTfFillOrKill(!tfFillOrKill);
                }}
              />
            </HStack>
          </Box>
        )}

        {exchangeType === "liquidity" && (
          <HStack>
            <Text fontSize="xs">tfPassive</Text>
            <Spacer />
            <Switch
              isDisabled
              size="sm"
              colorScheme="whatsapp"
              isChecked={tfPassive}
              onChange={() => setTfPassive(!tfPassive)}
            />
          </HStack>
        )}
        <Box ref={containerRef} />
      </Box>

      <Button
        bg={!fromTokenAmount || !toTokenAmount || isSameToken ? "secondary" : "primary"}
        w="100%"
        pos="absolute"
        bottom="3%"
        isDisabled={!fromTokenAmount || !toTokenAmount || isSameToken}
        onClick={handleConfirmClick}
      >
        confirm
      </Button>

      <a href="https://swap.anodos.finance/" target="_blank">
        <Text pos="absolute" fontSize="xs" bottom="-12px">
          Checkout{" "}
          <Text as="span" color="success">
            AMM
          </Text>{" "}
          on{" "}
          <Text as="span">
            ANODOS FINANCE <ExternalLinkIcon mt="-5px" stroke="#00DF16" />
          </Text>
        </Text>
      </a>

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
            title="create offer"
          />
        )}
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

export default MakeExchange;
