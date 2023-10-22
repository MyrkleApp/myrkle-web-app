import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMyWallets } from "../redux/wallet.slice";
import { IWalletAddress } from "../types";
import EXTERNAL_WALLET_DB from "@/services/db/external-wallet-db";

const cleanupDBWallets = (myWalletsDocs: any[]) => {
  const cleanedUpWallets: IWalletAddress[] = [];

  myWalletsDocs.forEach((walletDoc: any) => {
    cleanedUpWallets.push({
      name: walletDoc.doc?.name || "",
      address: walletDoc.doc.address,
      walletProvider: walletDoc.doc.walletProvider,
    });
  });

  return cleanedUpWallets;
};

function useRetrieveWallets() {
  const dispatch = useDispatch();

  useEffect(() => {
    const _setMyWallets = (myWallets: IWalletAddress[]) => dispatch(setMyWallets(myWallets));

    const retrieveWallets = async () => {
      const db = EXTERNAL_WALLET_DB();
      const myWalletsDocs = await db.getAllData();
      _setMyWallets(cleanupDBWallets(myWalletsDocs));
    };
    retrieveWallets();
  }, [dispatch]);

  return null;
}

export default useRetrieveWallets;
