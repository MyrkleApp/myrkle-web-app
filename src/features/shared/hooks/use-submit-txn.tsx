import { selectUserToken, selectWalletProvider } from "@/features/wallet/redux/wallet.selectors";
import { submitTransaction } from "@gemwallet/api";
import { useSelector } from "react-redux";
import { socket } from "../socket-io";
import { useEffect } from "react";

function useSubmitTxn() {
  const walletProvider = useSelector(selectWalletProvider);
  const userToken = useSelector(selectUserToken);

  // =============================================================================================
  // CROSSMARK
  // =============================================================================================

  const submitCrossmarkTxn = async (TxnReq: any) => {
    try {
      const sdk = window.xrpl.crossmark;
      const { response } = await sdk.signAndSubmitAndWait(TxnReq);
      if (response.data.meta.isRejected) {
        console.log("Transaction Rejected");
        return "Transaction Rejected";
      }
      if (response.data.meta.isError) {
        console.log("Error encountered during signing");
        return "Error encountered during signing";
      }
      if (response.data.meta.isFail) {
        console.log("Transaction Failed");
        return "Transaction Failed";
      }
      if (response.data.meta.isExpired) {
        console.log("Transaction Expired");
        return "Transaction Expired";
      }
      if (response.data.meta.isSuccess) {
        console.log({ status: "SUCCESS", hash: response.data.resp.result.hash });
        return { status: "SUCCESS", hash: response.data.resp.result.hash };
      }
    } catch (e) {
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
        return { status: "SUCCESS", hash: resp.result.hash };
      }
    } catch (e) {
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
        console.log("txn not-signed");
        return;
      }

      if (res.txSign) {
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
    }

    if (walletProvider === "gemwallet") {
      submitGemWalletTxn(data);
    }

    if (walletProvider === "xumm") {
      socket.emit("signTxn", {
        txjson: data,
        user_token: userToken,
      });
    }
  };

  return handleSubmitTxn;
}

export default useSubmitTxn;
