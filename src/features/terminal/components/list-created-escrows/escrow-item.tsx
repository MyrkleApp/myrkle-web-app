import Backdrop from "@/components/backdrop";
import Button from "@/components/button";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import ShowDetailsOnHover from "@/components/show-details-on-hover";
import XummTxnModal from "@/components/xumm-txn-modal";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import {
  useCancelXrpEscrowMutation,
  useFinishXrpEscrowMutation,
} from "@/features/shared/redux/xrp.api";
import { TTxnPipeline } from "@/features/shared/types";
import { selectAddress, selectNetwork } from "@/features/wallet/redux/wallet.selectors";
import { ellipsisAtCenter, formatDate, formatNumber, formatTime } from "@/helpers";
import { HStack, Td, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FulfillmentModal from "./fulfillment-modal";

export interface EscrowItemProps {
  escrow: any;
}

function EscrowItem({ escrow }: EscrowItemProps) {
  const address = useSelector(selectAddress);
  const network = useSelector(selectNetwork);

  const {
    isOpen: isFulfillmentModal,
    onOpen: onOpenFulfillmentModal,
    onClose: onCloseFulfillmentModal,
  } = useDisclosure();

  const [view, setView] = useState<TTxnPipeline>("default");
  const [fulfillment, setFulfillment] = useState("");

  const claimDate = new Date(`${escrow?.redeem_date}`);
  const claimDateToNumber = claimDate.getTime();
  const isClaimable = Date.now() >= claimDateToNumber;

  const [cancelXrpEscrow] = useCancelXrpEscrowMutation();
  const [finishXrpEscrow] = useFinishXrpEscrowMutation();

  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("escrow");

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

  const handleCancelEscrow = () => {
    setView("loading");

    cancelXrpEscrow({
      sender_addr: address,
      escrow_creator: escrow?.sender,
      prev_txn_id: escrow?.prev_txn_id,
      mainnet: network === "mainnet",
    })
      .unwrap()
      .then((res) => handleSubmitTxn(res))
      .catch(() => {
        setView("error-1");
      });
  };

  const handleFulfillmentModalClose = () => {
    onCloseFulfillmentModal();
    setFulfillment("");
  };

  const handleClaimEscrow = () => {
    setView("loading");

    handleFulfillmentModalClose();

    const finishEscrowData: any = {
      sender_addr: address,
      escrow_creator: escrow?.sender,
      prev_txn_id: escrow?.prev_txn_id,
      mainnet: network === "mainnet",
    };

    if (escrow.condition && fulfillment) {
      finishEscrowData.condition = escrow.condition;
      finishEscrowData.fulfillment = fulfillment;
    }

    finishXrpEscrow(finishEscrowData)
      .unwrap()
      .then((res) => handleSubmitTxn(res))
      .catch(() => {
        setView("error-1");
      });
  };

  const handleFulfillment = (e: any) => setFulfillment(e.target.value);

  const handleReset = () => {
    resetSubmitTxnResponse();
    setView("default");
  };

  return (
    <>
      <Tr bg="#333333">
        <Td textAlign="center" fontSize="sm" fontWeight="bold">
          <ShowDetailsOnHover
            fullText={escrow?.prev_txn_id}
            shortText={ellipsisAtCenter(escrow?.prev_txn_id)}
            color="#fff"
            alignLeft
          />
        </Td>
        <Td>
          <ShowDetailsOnHover
            fullText={escrow?.sender}
            shortText={ellipsisAtCenter(escrow?.sender)}
            color="danger"
          />
        </Td>
        <Td>
          <ShowDetailsOnHover
            fullText={escrow?.receiver}
            shortText={ellipsisAtCenter(escrow?.receiver)}
            color="primary"
          />
        </Td>
        <Td textAlign="center" fontSize="sm">
          <ShowDetailsOnHover
            fullText={`${formatNumber(escrow?.amount)} XRP`}
            shortText={formatNumber(escrow?.amount)}
            color="#fff"
          />
        </Td>
        <Td textAlign="center" fontSize="sm" fontWeight="bold">
          <ShowDetailsOnHover
            fullText={`${formatDate(escrow?.redeem_date)} at ${formatTime(escrow?.redeem_date)}`}
            shortText={formatDate(escrow?.redeem_date)}
            color="#fff"
          />
        </Td>
        <Td textAlign="center" fontSize="sm" fontWeight="bold">
          <ShowDetailsOnHover
            fullText={`${formatDate(escrow?.expiry_date)} at ${formatTime(escrow?.expiry_date)}`}
            shortText={formatDate(escrow?.expiry_date)}
            color="#fff"
          />
        </Td>
        <Td fontSize="sm" fontWeight="bold">
          <HStack justify="flex-end">
            <Button bg="danger" h="30px" px="30px" onClick={handleCancelEscrow}>
              Cancel
            </Button>
            <Button
              bg="primary"
              h="30px"
              px="30px"
              onClick={() => (escrow.condition ? onOpenFulfillmentModal() : handleClaimEscrow())}
              isDisabled={!isClaimable || escrow?.sender === address}
            >
              Claim
            </Button>
          </HStack>
        </Td>
      </Tr>

      <Backdrop isOpen={isFulfillmentModal}>
        <FulfillmentModal
          handleClose={handleFulfillmentModalClose}
          fulfillment={fulfillment}
          handleFulfillment={handleFulfillment}
          claimEscrow={handleClaimEscrow}
        />
      </Backdrop>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}
        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}
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

export default EscrowItem;
