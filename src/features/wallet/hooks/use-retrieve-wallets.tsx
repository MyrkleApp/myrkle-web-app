import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyWallets } from "../redux/wallet.slice";
import { IWalletAddress } from "../types";
import { selectUserId } from "@/features/auth/redux/auth.selectors";
import { formatMyWallets } from "@/helpers";
import { useLazyGetMyWalletsQuery } from "@/features/shared/redux/xrp.api";

function useRetrieveWallets() {
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();

  const [getMyWallets] = useLazyGetMyWalletsQuery();

  useEffect(() => {
    const _setMyWallets = (myWallets: IWalletAddress[]) => dispatch(setMyWallets(myWallets));

    const retrieveWallets = async () => {
      if (userId === null) return;

      try {
        const myWalletsData = await getMyWallets({}).unwrap();
        const myFormattedWallets = formatMyWallets(myWalletsData.results);
        _setMyWallets(myFormattedWallets);
      } catch (err) {
        console.log(err);
      }
      // const db = EXTERNAL_WALLET_DB();
      // const myWalletsDocs = await db.getAllData();

      // if (userId !== null) {
      //   _setMyWallets(getDBWallets(myWalletsDocs, userId));
      // }
    };
    retrieveWallets();
  }, [dispatch, getMyWallets, userId]);

  return null;
}

export default useRetrieveWallets;
