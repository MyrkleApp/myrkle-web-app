import PouchDB from "pouchdb";
import { IAddressBookItem } from "@/features/wallet/types";

function ADDRESS_BOOK_DB() {
  const db = new PouchDB("address-book-db");

  const getAllData = async () => {
    const allData = await db.allDocs({ include_docs: true });
    return allData.rows.filter((row: any) => !row.value.deleted && row.doc?.address);
  };

  const findAddressBookItem = async (addressBookItem: IAddressBookItem) => {
    const allData = await getAllData();
    const storedItem = allData.find(
      (x: any) => x.doc?.name === addressBookItem.name && x.doc.address === addressBookItem.address,
    );
    return storedItem;
  };

  const addAddressBookItem = async (addressBookItem: IAddressBookItem) => {
    const res = await db.post(addressBookItem);
    return res;
  };

  const removeAddressBookItem = async (addressBookItem: IAddressBookItem) => {
    const addressBookItemToRemove = await findAddressBookItem(addressBookItem);
    if (addressBookItemToRemove?.doc) {
      db.remove(addressBookItemToRemove.doc);
    }
  };

  const clearData = async () => {
    const res = await db.destroy();
    return res;
  };

  return {
    getAllData,
    findAddressBookItem,
    addAddressBookItem,
    clearData,
    removeAddressBookItem,
  };
}

export default ADDRESS_BOOK_DB;
