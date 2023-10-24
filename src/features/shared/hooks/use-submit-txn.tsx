import { selectUserToken, selectWalletProvider } from "@/features/wallet/redux/wallet.selectors";
import { submitTransaction } from "@gemwallet/api";
import { useSelector } from "react-redux";
import { socket } from "../socket-io";
import { useEffect, useState } from "react";

function useSubmitTxn() {
  const walletProvider = useSelector(selectWalletProvider);
  const userToken = useSelector(selectUserToken);

  const [isError, setIsError] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // =============================================================================================
  // CROSSMARK
  // =============================================================================================

  const submitCrossmarkTxn = async (TxnReq: any) => {
    try {
      const sdk = window.xrpl.crossmark;
      const { response } = await sdk.signAndSubmitAndWait(TxnReq);
      if (response.data.meta.isRejected) {
        console.log("Transaction Rejected");
        setIsError(true);
        setResponseMessage("Transaction rejected");
        setIsOpen(true);
        return "Transaction Rejected";
      }
      if (response.data.meta.isError) {
        setIsError(true);
        setResponseMessage("Error encountered during signing");
        setIsOpen(true);
        console.log("Error encountered during signing");
        return "Error encountered during signing";
      }
      if (response.data.meta.isFail) {
        setIsError(true);
        setResponseMessage("Transaction failed");
        setIsOpen(true);
        console.log("Transaction Failed");
        return "Transaction Failed";
      }
      if (response.data.meta.isExpired) {
        setIsError(true);
        setResponseMessage("Transaction expired");
        setIsOpen(true);
        console.log("Transaction Expired");
        return "Transaction Expired";
      }
      if (response.data.meta.isSuccess) {
        setIsError(false);
        setResponseMessage("Transaction successful");
        setIsOpen(true);
        console.log({ status: "SUCCESS", hash: response.data.resp.result.hash });
        return { status: "SUCCESS", hash: response.data.resp.result.hash };
      }
    } catch (e) {
      setIsError(true);
      setResponseMessage("something went wrong");
      setIsOpen(true);
      console.log(e);
      return e;
    }
  };

  // =============================================================================================
  // GEMWALLET
  // =============================================================================================

  const submitGemWalletTxn = async (transaction: any) => {
    try {
      const resp = await submitTransaction({ transaction });
      if (resp.result?.hash) {
        console.log({ status: "SUCCESS", hash: resp.result.hash });
        setIsError(false);
        setResponseMessage("Transaction successful");
        setIsOpen(true);
        return { status: "SUCCESS", hash: resp.result.hash };
      }
    } catch (e) {
      setIsError(true);
      setResponseMessage("Error occured");
      setIsOpen(true);
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
        setIsError(true);
        setResponseMessage("Transaction not signed");
        setIsOpen(true);
        console.log("txn not-signed");
        return;
      }

      if (res.txSign) {
        setIsError(false);
        setResponseMessage("Transaction signed");
        setIsOpen(true);
        console.log("txn signed");
      }
    });
  }, [walletProvider]);

  // =============================================================================================
  // handler
  // =============================================================================================

  const handleSubmitTxn = (data: any) => {
    if (walletProvider === "crossmark") {
      submitCrossmarkTxn(data);
      setIsOpen(false);
    }

    if (walletProvider === "gemwallet") {
      submitGemWalletTxn(data);
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

  return [
    {
      isSubmitTxnError: isError,
      submitTxnResponseMsg: responseMessage,
      isSubmitTxnResOpen: isOpen,
    },
    { handleSubmitTxn, handleCloseSubmitTxnRes },
  ] as const;
}

export default useSubmitTxn;
