import {
  selectAddress,
  selectNet,
  selectUserToken,
  selectWalletProvider,
} from "@/features/wallet/redux/wallet.selectors";
import { submitTransaction } from "@gemwallet/api";
import { useSelector } from "react-redux";
import { socket } from "../socket-io";
import { useEffect, useState } from "react";
import {
  useLazyGetAccountChecksQuery,
  useLazyGetAccountEscrowsQuery,
  useLazyGetAccountInfoQuery,
  useLazyGetAccountNftsQuery,
  useLazyGetAccountTokensQuery,
  useLazyGetBalanceQuery,
  useLazyGetOrderBookLiquidityQuery,
  useLazyGetPaymentTransactionsQuery,
  useLazyGetPendingOffersQuery,
  useLazyGetTxnStatusQuery,
  useRecordTransactionMutation,
} from "../redux/xrp.api";
import { checkForGemWallet } from "../connections/gemwallet";
import { TWalletProvider } from "@/features/wallet/types";
import { extractTxnJsonData } from "@/helpers";
import { IRecordTransaction } from "../types/xrp-mutations";
import sdk from "@crossmarkio/sdk";

const xummTimer = 15;

function useSubmitTxn(
  txnType: "account-info" | "token" | "nft" | "check" | "escrow" | "flag" | "exchange" | "",
) {
  // =============================================================================================
  // selectors
  // =============================================================================================

  const walletProvider = useSelector(selectWalletProvider);
  const userToken = useSelector(selectUserToken);
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  // =============================================================================================
  // state
  // =============================================================================================

  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);
  const [xummTxnQrCode, setXummTxnQrCode] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [xummTxnTimerCount, setXummTxnTimerCount] = useState(xummTimer);
  const [isXummCountDown, setIsXummCountDown] = useState(false);

  // transaction data
  const [addressPerformingTxn, setAddressPerformingTxn] = useState("");
  const [transactionAmount, setTransactionAmount] = useState<any>("");
  const [transactionType, setTransactionType] = useState("");

  // =============================================================================================
  // api & effect
  // =============================================================================================

  const [getAccountTokens] = useLazyGetAccountTokensQuery();
  const [getBalance] = useLazyGetBalanceQuery();
  const [getAccountInfo] = useLazyGetAccountInfoQuery();
  const [getAccountNfts] = useLazyGetAccountNftsQuery();
  const [getPaymentTxns] = useLazyGetPaymentTransactionsQuery();
  const [getAccountChecks] = useLazyGetAccountChecksQuery();
  const [getAccountEscrows] = useLazyGetAccountEscrowsQuery();
  const [getPendingOffers] = useLazyGetPendingOffersQuery();
  const [getPendingLiquidity] = useLazyGetOrderBookLiquidityQuery();
  const [getTxnStatus] = useLazyGetTxnStatusQuery();

  const [recordTransaction] = useRecordTransactionMutation();

  useEffect(() => {
    if (isSuccess) {
      getBalance({ address, net });
      getPaymentTxns({ address, net });
      if (txnType === "account-info") getAccountInfo({ address, net });
      if (txnType === "token") getAccountTokens({ address, net });
      if (txnType === "nft") getAccountNfts({ address, net });
      if (txnType === "check") getAccountChecks({ address, net });
      if (txnType === "escrow") getAccountEscrows({ address, net });
      if (txnType === "exchange") {
        getPendingOffers({ address, net });
        getPendingLiquidity({ address, net });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // =============================================================================================
  // CROSSMARK
  // =============================================================================================

  const submitCrossmarkTxn = async (
    TxnReq: any,
    txnDetails: Omit<IRecordTransaction, "transaction_hash">,
  ) => {
    try {
      // const sdk = window.xrpl.crossmark;
      const { response } = await sdk.methods.signAndSubmitAndWait(TxnReq);
      if (response.data.meta.isRejected) {
        setIsSuccess(false);
        setResponseMessage("Transaction rejected");
        setIsOpen(true);
        setIsLoading(false);
        return;
      }
      if (response.data.meta.isError) {
        setIsSuccess(false);
        setResponseMessage("Error encountered during signing");
        setIsOpen(true);
        setIsLoading(false);
        return;
      }
      if (response.data.meta.isFail) {
        setIsSuccess(false);
        setResponseMessage("Transaction failed");
        setIsOpen(true);
        setIsLoading(false);
        recordTransaction({ ...txnDetails, transaction_hash: response.data.resp.result.hash });
        return;
      }
      if (response.data.meta.isExpired) {
        setIsSuccess(false);
        setResponseMessage("Transaction expired");
        setIsOpen(true);
        setIsLoading(false);
        return;
      }
      if (response.data.meta.isSuccess) {
        setIsSuccess(true);
        setResponseMessage("Transaction successful");
        setIsOpen(true);
        setIsLoading(false);
        recordTransaction({ ...txnDetails, transaction_hash: response.data.resp.result.hash });
        return;
      }
    } catch (e) {
      setIsSuccess(false);
      setResponseMessage("something went wrong");
      setIsOpen(true);
      setIsLoading(false);
      return e;
    }
  };

  // =============================================================================================
  // GEMWALLET
  // =============================================================================================

  const submitGemWalletTxn = async (
    transaction: any,
    txnDetails: Omit<IRecordTransaction, "transaction_hash">,
  ) => {
    try {
      const isGemWallet = await checkForGemWallet();

      if (isGemWallet !== true) return;
      // todo: else throw an error that gets caught in the catchblock
      // this tells the user to install gemWallet

      const resp = await submitTransaction({ transaction });
      if (resp.result?.hash) {
        setIsSuccess(true);
        setResponseMessage("Transaction successful");
        setIsOpen(true);
        setIsLoading(false);
        recordTransaction({ ...txnDetails, transaction_hash: resp.result.hash });
        return;
      }
      if (resp.type === "reject") {
        setIsSuccess(false);
        setResponseMessage("Transaction Rejected");
        setIsOpen(true);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      setIsSuccess(false);
      setResponseMessage("Error occured");
      setIsOpen(true);
      setIsLoading(false);
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
        setXummTxnQrCode(res.qrCode);
        setXummTxnTimerCount(xummTimer);
        setIsXummCountDown(false);
        return;
      }

      if (!res.txSign) {
        setXummTxnQrCode("");
        setIsSuccess(false);
        setResponseMessage("Transaction not signed");
        setIsOpen(true);
        setIsLoading(false);
        return;
      }

      if (res.txSign) {
        setXummTxnQrCode("");
        setIsOpen(true);
        setIsLoading(false);

        getTxnStatus({ id: res.transactionId, net })
          .unwrap()
          .then((txnStatus: string) => {
            if (txnStatus.toLowerCase().includes("success")) {
              setIsSuccess(true);

              recordTransaction({
                wallet: addressPerformingTxn,
                transaction_hash: res.transactionId,
                amount: transactionAmount,
                transaction_type: transactionType,
                wallet_provider: "xumm",
              });
            } else {
              setIsSuccess(false);
              setResponseMessage(
                "Get detailed information of the transaction from your wallet provider",
              );
              recordTransaction({
                wallet: addressPerformingTxn,
                transaction_hash: res.transactionId,
                amount: transactionAmount,
                transaction_type: transactionType,
                wallet_provider: "xumm",
              });
            }
          });
      }
    });
  }, [getTxnStatus, net, walletProvider]);

  useEffect(() => {
    let interval: any;

    if (isXummCountDown) {
      interval = setInterval(() => setXummTxnTimerCount((prevValue) => prevValue - 1), 1000);
    }

    return () => clearInterval(interval);
  }, [isXummCountDown]);

  useEffect(() => {
    if (xummTxnTimerCount === 0) {
      setXummTxnTimerCount(xummTimer);
      setIsXummCountDown(false);
      setIsSuccess(false);
      setResponseMessage("Transaction timeout");
      setIsOpen(true);
      setIsLoading(false);
    }
  }, [xummTxnTimerCount]);

  // =============================================================================================
  // handler
  // =============================================================================================

  const handleSubmitTxn = (data: any, higherPriorityWalletProvider?: TWalletProvider) => {
    setIsLoading(true);

    let walletProviderToUse: TWalletProvider | "" = "";

    if (higherPriorityWalletProvider) {
      walletProviderToUse = higherPriorityWalletProvider;
    } else {
      walletProviderToUse = walletProvider;
    }

    /**
     * *NOTE: the active wallet is not always the one that performs the transaction.
     *
     * E.g in create token, some other wallet is picked to be the manager
     *
     */
    const { amount, wallet, transactionType } = extractTxnJsonData(data);

    setTransactionAmount(amount);
    setTransactionType(transactionType);
    setAddressPerformingTxn(wallet);

    if (walletProviderToUse === "crossmark") {
      submitCrossmarkTxn(data, {
        wallet,
        amount,
        transaction_type: transactionType,
        wallet_provider: "crossmark",
      });
    }

    if (walletProviderToUse === "gemwallet") {
      submitGemWalletTxn(data, {
        wallet,
        amount,
        transaction_type: transactionType,
        wallet_provider: "gemwallet",
      });
    }

    if (walletProviderToUse === "xumm") {
      socket.emit("signTxn", {
        txjson: data,
        user_token: userToken,
      });
      setXummTxnTimerCount(xummTimer);
      setIsXummCountDown(true);
    }

    setIsOpen(false);
  };

  const handleCloseSubmitTxnRes = () => setIsOpen(false);

  const resetSubmitTxnResponse = () => {
    setIsSuccess(null);
    setXummTxnQrCode("");
  };

  return [
    {
      isSubmitTxnSuccess: isSuccess,
      submitTxnResponseMsg: responseMessage,
      isSubmitTxnResOpen: isOpen,
      isSubmitTxnLoading: isLoading,
      xummTxnQrCode,
    },
    { handleSubmitTxn, handleCloseSubmitTxnRes, resetSubmitTxnResponse },
  ] as const;
}

export default useSubmitTxn;
