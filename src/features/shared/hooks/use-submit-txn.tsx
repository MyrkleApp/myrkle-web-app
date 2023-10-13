import { selectWalletProvider } from "@/features/wallet/redux/wallet.selectors";
import { submitTransaction } from "@gemwallet/api";
import { useSelector } from "react-redux";

function useSubmitTxn() {
  const walletProvider = useSelector(selectWalletProvider);

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
  // handler
  // =============================================================================================

  const handleSubmitTxn = (data: any) => {
    if (walletProvider === "crossmark") {
      submitCrossmarkTxn(data);
    }

    if (walletProvider === "gemwallet") {
      submitGemWalletTxn(data);
    }
  };

  return handleSubmitTxn;
}

export default useSubmitTxn;
