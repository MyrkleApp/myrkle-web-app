import Backdrop from "@/components/backdrop";
import Button from "@/components/button";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import ShowDetailsOnHover from "@/components/show-details-on-hover";
import XummTxnModal from "@/components/xumm-txn-modal";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import {
  useCancelCheckMutation,
  useCashTokenCheckMutation,
  useCashXrpCheckMutation,
} from "@/features/shared/redux/xrp.api";
import { TTxnPipeline } from "@/features/shared/types";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { ellipsisAtCenter, formatNumber, isXrpToken } from "@/helpers";
import { HStack, Td, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface ICheckItemProps {
  check: any;
}

function CheckItem({ check }: ICheckItemProps) {
  const address = useSelector(selectAddress);

  const [view, setView] = useState<TTxnPipeline>("default");

  const [cashXrpCheck] = useCashXrpCheckMutation();
  const [cashTokenCheck] = useCashTokenCheckMutation();
  const [cancelCheck] = useCancelCheckMutation();

  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn("check");

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

  const handleCancelCheck = () => {
    setView("loading");

    cancelCheck({
      sender_addr: address,
      check_id: check.check_id,
    })
      .unwrap()
      .then((res) => handleSubmitTxn(res))
      .catch(() => {
        setView("error-1");
      });
  };

  const handleCashCheck = () => {
    setView("loading");

    if (isXrpToken({ token: check.token })) {
      cashXrpCheck({
        sender_addr: address,
        check_id: check.check_id,
        amount: check.amount,
      })
        .unwrap()
        .then((res) => handleSubmitTxn(res))
        .catch(() => setView("error-1"));
    } else {
      cashTokenCheck({
        sender_addr: address,
        check_id: check.check_id,
        amount: check.amount,
        token: check.token,
        issuer: check.issuer,
      });
    }
  };

  const handleReset = () => {
    resetSubmitTxnResponse();
    setView("default");
  };

  return (
    <>
      <Tr bg="#333333">
        <Td textAlign="center" fontSize="sm" fontWeight="bold">
          <ShowDetailsOnHover
            fullText={check.check_id}
            shortText={ellipsisAtCenter(check.check_id)}
            color="#fff"
            alignLeft
          />
        </Td>
        <Td>
          <ShowDetailsOnHover
            fullText={check.sender}
            shortText={ellipsisAtCenter(check.sender)}
            color="danger"
          />
        </Td>
        <Td>
          <ShowDetailsOnHover
            fullText={check.receiver}
            shortText={ellipsisAtCenter(check.receiver)}
            color="primary"
          />
        </Td>
        <Td textAlign="center" fontSize="sm" pt={3}>
          {formatNumber(check.amount)}
        </Td>
        <Td textAlign="center" fontSize="sm" fontWeight="bold" pt={3}>
          {check.expiry_date.split(" ")[0]}
        </Td>
        <Td fontSize="sm" fontWeight="bold">
          <HStack justify="flex-end">
            <Button bg="danger" h="30px" px="30px" onClick={handleCancelCheck}>
              Cancel
            </Button>
            <Button
              bg="primary"
              h="30px"
              px="30px"
              onClick={handleCashCheck}
              isDisabled={check.issuer === address}
            >
              Check
            </Button>
          </HStack>
        </Td>
      </Tr>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}
        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "xumm-qr-code" && <XummTxnModal qrCodeImage={xummTxnQrCode} />}
        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default CheckItem;
