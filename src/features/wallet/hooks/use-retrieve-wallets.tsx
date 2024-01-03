import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyWallets } from "../redux/wallet.slice";
import { IWalletAddress } from "../types";
import EXTERNAL_WALLET_DB from "@/services/db/external-wallet-db";
import { selectUserId } from "@/features/auth/redux/auth.selectors";
import { getDBWallets } from "@/helpers";

function useRetrieveWallets() {
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();

  useEffect(() => {
    const _setMyWallets = (myWallets: IWalletAddress[]) => dispatch(setMyWallets(myWallets));

    const retrieveWallets = async () => {
      const db = EXTERNAL_WALLET_DB();
      const myWalletsDocs = await db.getAllData();

      if (userId !== null) {
        _setMyWallets(getDBWallets(myWalletsDocs, userId));
      }
    };
    retrieveWallets();
  }, [dispatch, userId]);

  return null;
}

export default useRetrieveWallets;
