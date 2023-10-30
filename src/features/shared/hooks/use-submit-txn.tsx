import { selectUserToken, selectWalletProvider } from "@/features/wallet/redux/wallet.selectors";
import { submitTransaction } from "@gemwallet/api";
import { useSelector } from "react-redux";
import { socket } from "../socket-io";
import { useEffect, useState } from "react";

function useSubmitTxn() {
  const walletProvider = useSelector(selectWalletProvider);
  const userToken = useSelector(selectUserToken);

  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // =============================================================================================
  // CROSSMARK
  // =============================================================================================

  const submitCrossmarkTxn = async (
    TxnReq: any,
    successCallback?: () => void,
    errorCallback?: () => void,
  ) => {
    try {
      const sdk = window.xrpl.crossmark;
      const { response } = await sdk.signAndSubmitAndWait(TxnReq);
      if (response.data.meta.isRejected) {
        console.log("Transaction Rejected");
        setIsSuccess(false);
        setResponseMessage("Transaction rejected");
        setIsOpen(true);
        setIsLoading(false);
        if (errorCallback) errorCallback();
        return "Transaction Rejected";
      }
      if (response.data.meta.isError) {
        setIsSuccess(false);
        setResponseMessage("Error encountered during signing");
        setIsOpen(true);
        setIsLoading(false);
        if (errorCallback) errorCallback();
        console.log("Error encountered during signing");
        return "Error encountered during signing";
      }
      if (response.data.meta.isFail) {
        setIsSuccess(false);
        setResponseMessage("Transaction failed");
        setIsOpen(true);
        setIsLoading(false);
        if (errorCallback) errorCallback();
        console.log("Transaction Failed");
        return "Transaction Failed";
      }
      if (response.data.meta.isExpired) {
        setIsSuccess(false);
        setResponseMessage("Transaction expired");
        setIsOpen(true);
        setIsLoading(false);
        if (errorCallback) errorCallback();
        console.log("Transaction Expired");
        return "Transaction Expired";
      }
      if (response.data.meta.isSuccess) {
        setIsSuccess(true);
        setResponseMessage("Transaction successful");
        setIsOpen(true);
        setIsLoading(false);
        if (successCallback) successCallback();
        console.log({ status: "SUCCESS", hash: response.data.resp.result.hash });
        return { status: "SUCCESS", hash: response.data.resp.result.hash };
      }
    } catch (e) {
      setIsSuccess(false);
      setResponseMessage("something went wrong");
      setIsOpen(true);
      setIsLoading(false);
      if (errorCallback) errorCallback();
      console.log(e);
      return e;
    }
  };

  // =============================================================================================
  // GEMWALLET
  // =============================================================================================

  const submitGemWalletTxn = async (
    transaction: any,
    successCallback?: () => void,
    errorCallback?: () => void,
  ) => {
    try {
      const resp = await submitTransaction({ transaction });
      if (resp.result?.hash) {
        console.log({ status: "SUCCESS", hash: resp.result.hash });
        setIsSuccess(true);
        setResponseMessage("Transaction successful");
        setIsOpen(true);
        setIsLoading(false);
        if (successCallback) successCallback();
        return { status: "SUCCESS", hash: resp.result.hash };
      }
    } catch (e) {
      setIsSuccess(false);
      setResponseMessage("Error occured");
      setIsOpen(true);
      setIsLoading(false);
      if (errorCallback) errorCallback();
      console.log(e);
      return e;
    }
  };

  // =============================================================================================
  // XUMM
  // =============================================================================================

  useEffect(() => {
    if (walletProvider !== "xumm") return;

    socket.on("signTxn", (res) => {
      if (res.qrCode) {
        console.log(res.qrCode);
        return;
      }

      if (!res.txSign) {
        setIsSuccess(false);
        setResponseMessage("Transaction not signed");
        setIsOpen(true);
        setIsLoading(false);
        console.log("txn not-signed");
        return;
      }

      if (res.txSign) {
        setIsSuccess(true);
        setResponseMessage("Transaction signed");
        setIsOpen(true);
        setIsLoading(false);
        console.log("txn signed");
      }
    });
  }, [walletProvider]);

  // =============================================================================================
  // handler
  // =============================================================================================

  const handleSubmitTxn = (data: any, successCallback?: () => void, errorCallback?: () => void) => {
    setIsLoading(true);

    if (walletProvider === "crossmark") {
      submitCrossmarkTxn(data, successCallback, errorCallback);
      setIsOpen(false);
    }

    if (walletProvider === "gemwallet") {
      submitGemWalletTxn(data, successCallback, errorCallback);
      setIsOpen(false);
    }

    if (walletProvider === "xumm") {
      socket.emit("signTxn", {
        txjson: data,
        user_token: userToken,
      });
      setIsOpen(false);
    }
  };

  const handleCloseSubmitTxnRes = () => setIsOpen(false);
  const resetSubmitTxnResponse = () => setIsSuccess(null);

  return [
    {
      isSubmitTxnSuccess: isSuccess,
      submitTxnResponseMsg: responseMessage,
      isSubmitTxnResOpen: isOpen,
      isSubmitTxnLoading: isLoading,
    },
    { handleSubmitTxn, handleCloseSubmitTxnRes, resetSubmitTxnResponse },
  ] as const;
}

export default useSubmitTxn;
