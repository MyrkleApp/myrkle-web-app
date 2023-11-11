import { Circle, Flex, useDisclosure } from "@chakra-ui/react";
import OfferBox from "./offer-box";
import ExchangeIcon from "@/icons/exchange";
import Backdrop from "@/components/backdrop";
import TxnDetailsModal from "../txn-details-modal";
import { isXrpToken } from "@/helpers";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import xrpLogo from "@/assets/xrp-logo.svg";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { useOrderBookSwapMutation } from "@/features/shared/redux/xrp.api";
import { TTxnPipeline } from "@/features/shared/types";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";

export interface OfferRowProps {
  offer: any;
}

// sender_addr: xummConnectionData.account,
//           buy: order.sell_amount,
//           sell: order.buy_amount,
//           tf_sell: tfSell,
//           tf_fill_or_kill: tfFillOrKill,
//           tf_immediate_or_cancel: tfImmediateOrCancel,
//           buy_type: checkIsXrpToken(getToken.tokenName) ? "xrp" : getToken.tokenName,
//           sell_type: checkIsXrpToken(giveToken.tokenName) ? "xrp" : giveToken.tokenName,
//           buy_issuer: order.sell_issuer,
//           sell_issuer: order.buy_issuer,
//           network: xummConnectionData.network,

function OfferRow({ offer }: OfferRowProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [view, setView] = useState<TTxnPipeline>("default");

  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn("exchange");

  // ============================================================================================
  // selectors
  // ============================================================================================

  const address = useSelector(selectAddress);

  // ============================================================================================
  // api
  // ============================================================================================

  const [matchOffer] = useOrderBookSwapMutation();
  // const [cancelOffer] = useCancelOfferMutation();

  // ============================================================================================
  // effects
  // ============================================================================================

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

  const handleOpen = () => {
    setView("default");
    onOpen();
    resetSubmitTxnResponse();
  };

  const handleProceed = () => {
    setView("loading");

    matchOffer({
      sender_addr: address,
      buy_type: offer?.sell_token,
      sell_type: offer?.buy_token,
      buy_amount: offer?.sell_amount,
      sell_amount: offer?.buy_amount,
      buy_issuer: offer?.sell_issuer || "000",
      sell_issuer: offer?.buy_issuer || "000",
      tf_sell: false,
      tf_fill_or_kill: false,
      tf_immediate_or_cancel: false,
    })
      .unwrap()
      .then((res) => {
        handleSubmitTxn(res);
      })
      .catch(() => setView("error-1"));

    // cancelOffer({
    //   sender_addr: address,
    //   offer_seq: offer?.sequence,
    // })
    //   .unwrap()
    //   .then((res) => {
    //     handleSubmitTxn(res);
    //   })
    //   .catch(() => setView("error-1"));
  };

  const handleReset = () => {
    resetSubmitTxnResponse();
    setView("default");
    onClose();
  };

  return (
    <>
      <Flex
        h="calc(50% - 10px)"
        maxH="110px"
        bg="secondary"
        borderRadius="12px"
        p={3}
        mb="10px"
        gap="7px"
        pos="relative"
        cursor="pointer"
        onClick={handleOpen}
      >
        <OfferBox token={offer?.buy_token} issuer={offer?.buy_issuer} amount={offer?.buy_amount} />
        <Circle
          bg="red"
          size="20px"
          cursor="pointer"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <ExchangeIcon stroke="gray" fill="none" />
        </Circle>

        <OfferBox
          token={offer?.sell_token}
          issuer={offer?.sell_issuer}
          amount={offer?.sell_amount}
        />
      </Flex>
      <Backdrop isOpen={isOpen}>
        {/* this is for match offer */}
        {view === "default" && (
          <TxnDetailsModal
            handleClose={onClose}
            fromTokenName={offer?.sell_token}
            fromTokenIssuer={offer?.sell_issuer}
            fromTokenAmount={offer?.sell_amount}
            fromTokenIcon={isXrpToken({ token: offer?.sell_token }) ? xrpLogo : tokenPlaceholder}
            toTokenName={offer?.buy_token}
            toTokenIssuer={offer?.buy_issuer}
            toTokenAmount={offer?.buy_amount}
            toTokenIcon={isXrpToken({ token: offer?.buy_token }) ? xrpLogo : tokenPlaceholder}
            sequence={offer?.sequence}
            offerId={offer?.offer_id}
            creator={offer?.creator}
            proceedText="Do you want to match offer?"
            title="match offer"
            handleProceed={handleProceed}
          />
        )}
        {view === "loading" && <MyrkleLoader />}
        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "xumm-qr-code" && <XummTxnModal qrCodeImage={xummTxnQrCode} />}
        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default OfferRow;
