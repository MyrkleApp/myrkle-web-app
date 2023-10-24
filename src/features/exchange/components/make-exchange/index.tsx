import Button from "@/components/button";
import ExchangeIcon from "@/icons/exchange";
import { Box, Circle, Text, useDisclosure } from "@chakra-ui/react";
import ExchangeBox from "../exchange-box";
import { numbersOnlyRegex, xrpToken } from "@/constants";
import { IToken } from "@/features/shared/types";
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
import coinDollar from "@/assets/coin-dollar.svg";
import { isXrpToken } from "@/helpers";

function MakeExchange() {
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get("token");
  const urlIssuer = searchParams.get("issuer");

  const [, { handleSubmitTxn }] = useSubmitTxn();

  // ============================================================================================
  // selectors
  // ============================================================================================

  const address = useSelector(selectAddress);
  const exchangeType = useSelector(selectExchangeType);

  // ============================================================================================
  // state & disclosure
  // ============================================================================================

  const {
    isOpen: isTxnModalOpen,
    onOpen: onOpenTxnModal,
    onClose: onCloseTxnModal,
  } = useDisclosure();

  const [fromToken, setFromToken] = useState<IToken>(xrpToken);
  const [toToken, setToToken] = useState<IToken>(xrpToken);
  const [fromTokenAmount, setFromTokenAmount] = useState("");
  const [toTokenAmount, setToTokenAmount] = useState("");

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
        icon: isXrpToken({ token: urlToken, issuer: urlIssuer }) ? xrpLogo : coinDollar,
      });
    }
  }, [urlIssuer, urlToken]);

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
      .then((res) => {
        console.log(res);
        onOpenTxnModal();
      });
  };

  const handleProceed = () => {
    if (exchangeType === "swap") {
      handleSubmitTxn(orderBookSwapData);
    }
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
        bg="secondary"
        w="100%"
        pos="absolute"
        bottom="3%"
        isLoading={isOrderBookSwapLoading}
        onClick={handleConfirmClick}
      >
        confirm
      </Button>

      <Backdrop isOpen={isTxnModalOpen}>
        <TxnDetailsModal handleClose={onCloseTxnModal} handleProceed={handleProceed} />
      </Backdrop>
    </>
  );
}

export default MakeExchange;
