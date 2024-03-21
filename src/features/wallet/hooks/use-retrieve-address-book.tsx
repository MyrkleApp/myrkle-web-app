import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAddressBookList } from "../redux/wallet.slice";
import { IAddressBookItem } from "../types";
import { getAddressBookDBList } from "@/helpers";
import ADDRESS_BOOK_DB from "@/services/db/address-book-db";

function useRetrieveAddressBookList() {
  const dispatch = useDispatch();

  useEffect(() => {
    const _setMyWallets = (myWallets: IAddressBookItem[]) =>
      dispatch(setAddressBookList(myWallets));

    const retrieveWallets = async () => {
      const addressBookDB = ADDRESS_BOOK_DB();
      const myWalletsDocs = await addressBookDB.getAllData();

      _setMyWallets(getAddressBookDBList(myWalletsDocs));
    };
    retrieveWallets();
  }, [dispatch]);

  return null;
}

export default useRetrieveAddressBookList;
