import { Circle, Flex, useDisclosure } from "@chakra-ui/react";
import PendingOfferBox from "./pending-offer-box";
import ExchangeIcon from "@/icons/exchange";
import Backdrop from "@/components/backdrop";
import TxnDetailsModal from "../txn-details-modal";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import xrpLogo from "@/assets/xrp-logo.svg";
import { isXrpToken } from "@/helpers";
import { useEffect, useState } from "react";
import { TTxnPipeline } from "@/features/shared/types";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { useCancelOfferMutation } from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";

export interface PendingOfferRowProps {
  offer: any;
}

function PendingOfferRow({ offer }: PendingOfferRowProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [view, setView] = useState<TTxnPipeline>("default");

  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn();

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
        h="65px"
        bg="secondary"
        borderRadius="7px"
        p={1}
        mb="10px"
        gap="30px"
        pos="relative"
        cursor="pointer"
        onClick={handleOpen}
      >
        <PendingOfferBox
          token={offer?.buy_token}
          issuer={offer?.buy_issuer}
          amount={offer?.buy_amount}
        />
        <Circle
          bg="darkest"
          size="20px"
          cursor="pointer"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <ExchangeIcon stroke="gray" fill="none" />
        </Circle>
        <PendingOfferBox
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
        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "xumm-qr-code" && <XummTxnModal qrCodeImage={xummTxnQrCode} />}
        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default PendingOfferRow;
