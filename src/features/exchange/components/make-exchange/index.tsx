import Button from "@/components/button";
import ExchangeIcon from "@/icons/exchange";
import { Box, Circle, Text } from "@chakra-ui/react";
import ExchangeBox from "../exchange-box";
import { numbersOnlyRegex, xrpToken } from "@/constants";
import { IToken, TTxnPipeline } from "@/features/shared/types";
import { useEffect, useState } from "react";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useOrderBookSwapMutation } from "@/features/shared/redux/xrp.api";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import TxnDetailsModal from "../txn-details-modal";
import Backdrop from "@/components/backdrop";
import { selectExchangeType } from "../../redux/exchange.selectors";
import { useSearchParams } from "react-router-dom";
import xrpLogo from "@/assets/xrp-logo.svg";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import { isXrpToken } from "@/helpers";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";

function MakeExchange() {
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get("token");
  const urlIssuer = searchParams.get("issuer");

  const [{ isSubmitTxnSuccess }, { handleSubmitTxn, resetSubmitTxnResponse }] = useSubmitTxn();

  // ============================================================================================
  // selectors
  // ============================================================================================

  const address = useSelector(selectAddress);
  const exchangeType = useSelector(selectExchangeType);

  // ============================================================================================
  // state
  // ============================================================================================

  const [fromToken, setFromToken] = useState<IToken>(xrpToken);
  const [toToken, setToToken] = useState<IToken>(xrpToken);
  const [fromTokenAmount, setFromTokenAmount] = useState("");
  const [toTokenAmount, setToTokenAmount] = useState("");
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
      setFromToken({
        token: urlToken,
        issuer: urlIssuer,
        icon: isXrpToken({ token: urlToken, issuer: urlIssuer }) ? xrpLogo : tokenPlaceholder,
      });
    }
  }, [urlIssuer, urlToken]);

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
    setFromToken(token);
  };

  const handleToToken = (token: IToken) => {
    setToToken(token);
  };

  const handleFlipTokens = () => {
    const newFromToken = { ...toToken };
    const newToToken = { ...fromToken };
    setFromToken(newFromToken);
    setToToken(newToToken);
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
      tf_sell: false,
      tf_fill_or_kill: false,
      tf_immediate_or_cancel: false,
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
      <Text color="textDark" fontSize="xs" fontWeight="bold" pos="absolute" top="13%">
        From
      </Text>
      <Box pos="absolute" top="19%" w="100%" h="20%">
        <ExchangeBox
          token={fromToken}
          handleToken={handleFromToken}
          amount={fromTokenAmount}
          handleAmount={(e: any) =>
            e.target.value.match(numbersOnlyRegex) && setFromTokenAmount(e.target.value)
          }
        />
      </Box>

      <Circle
        bg="secondary"
        size="22px"
        cursor="pointer"
        pos="absolute"
        top="47%"
        left="50%"
        transform="translate(-50%, -50%) rotate(90deg)"
        onClick={handleFlipTokens}
      >
        <ExchangeIcon stroke="gray" fill="none" />
      </Circle>

      <Text color="textDark" fontSize="xs" fontWeight="bold" pos="absolute" top="50%">
        To
      </Text>
      <Box pos="absolute" top="56%" w="100%" h="20%">
        <ExchangeBox
          token={toToken}
          handleToken={handleToToken}
          amount={toTokenAmount}
          handleAmount={(e: any) =>
            e.target.value.match(numbersOnlyRegex) && setToTokenAmount(e.target.value)
          }
        />
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
        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default MakeExchange;
