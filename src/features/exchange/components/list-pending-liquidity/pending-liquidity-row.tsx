import { Circle, Flex, useDisclosure } from "@chakra-ui/react";
import OfferBox from "./offer-box";
import ExchangeIcon from "@/icons/exchange";
import Backdrop from "@/components/backdrop";
import TxnDetailsModal from "../txn-details-modal";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { useCancelOfferMutation } from "@/features/shared/redux/xrp.api";
import { TTxnPipeline } from "@/features/shared/types";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";
import { isXrpToken } from "@/helpers";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import xrpLogo from "@/assets/xrp-logo.svg";

export interface OfferRowProps {
  offer: any;
}

function PendingLiquidityRow({ offer }: OfferRowProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [view, setView] = useState<TTxnPipeline>("default");

  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("exchange");

  // ============================================================================================
  // selectors
  // ============================================================================================

  const address = useSelector(selectAddress);

  // ============================================================================================
  // api
  // ============================================================================================

  const [cancelOffer] = useCancelOfferMutation();

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

    cancelOffer({
      sender_addr: address,
      offer_seq: offer?.sequence,
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
    onClose();
  };

  return (
    <>
      <Flex
        minH="120px"
        // minH="calc(50% - 10px)"
        // maxH="110px"
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
        {view === "default" && (
          <TxnDetailsModal
            handleClose={onClose}
            fromTokenName={offer?.buy_token}
            fromTokenIssuer={offer?.buy_issuer}
            fromTokenIcon={isXrpToken({ token: offer?.buy_token }) ? xrpLogo : tokenPlaceholder}
            fromTokenAmount={offer?.buy_amount}
            toTokenName={offer?.sell_token}
            toTokenIssuer={offer?.sell_issuer}
            toTokenIcon={isXrpToken({ token: offer?.sell_token }) ? xrpLogo : tokenPlaceholder}
            toTokenAmount={offer?.sell_amount}
            sequence={offer?.sequence}
            // rate={offer?.rate}
            proceedText="Do you want to cancel offer?"
            title="cancel offer"
            handleProceed={handleProceed}
          />
        )}
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

export default PendingLiquidityRow;
