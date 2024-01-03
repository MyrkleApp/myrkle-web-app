import { checkForCrossmark } from "@/features/shared/connections/crossmark";
import { selectMyWallets } from "@/features/wallet/redux/wallet.selectors";
import { addWallet, signIn } from "@/features/wallet/redux/wallet.slice";
import { ISignIn, IWalletAddress } from "@/features/wallet/types";
import { checkWalletExists } from "@/helpers";
import ROUTES from "@/routes";
import EXTERNAL_WALLET_DB from "@/services/db/external-wallet-db";
import { IAddExternalWallet } from "@/services/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { selectUserId } from "../redux/auth.selectors";

function useCrossmarkSignIn() {
  const navigate = useNavigate();

  const [, storeSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  const myWallets = useSelector(selectMyWallets);
  const userId = useSelector(selectUserId);

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const _signIn = (data: ISignIn) => dispatch(signIn(data));
  const _addWallet = (data: IWalletAddress) => dispatch(addWallet(data));

  const handleSaveInBrowserDB = async (wallet: IAddExternalWallet) => {
    const db = EXTERNAL_WALLET_DB();
    await db.addWallet(wallet);
  };

  const crossmarkSignIn = async () => {
    try {
      checkForCrossmark();
      const sdk = window.xrpl.crossmark;
      const { response } = await sdk.signInAndWait();
      if (response.data.meta.isRejected) {
        // console.log("You have to sign in to continue");
        setError("You have to sign in to continue");
      }
      if (response.data.meta.isError) {
        // console.log("Error encountered during signing");
        setError("Error encountered during signing");
      }
      if (response.data.meta.isFailed) {
        // console.log("Transaction Failed");
        setError("Transaction Failed");
      }
      if (response.data.meta.isExpired) {
        // console.log("Transaction Expired");
        setError("Transaction Expired");
      }
      const network = response.data.network.type === "test" ? "testnet" : "mainnet";
      const address = response.data.address;

      const isWalletExists = checkWalletExists(myWallets, address, "crossmark");
      if (isWalletExists) {
        return { isWalletExists };
      }

      if (response.data.meta.isSuccess && userId !== null) {
        _signIn({ address, network, userToken: "", walletProvider: "crossmark" });
        _addWallet({ address, walletProvider: "crossmark", name: "" });
        storeSignInData({ address, network, userToken: "", walletProvider: "crossmark" });
        handleSaveInBrowserDB({ address, walletProvider: "crossmark", userId });
        navigate(ROUTES.WALLET);
      }
    } catch (e) {
      console.log(e);
      // return e;
    }
  };

  return [crossmarkSignIn, { error }] as const;
}

export default useCrossmarkSignIn;
