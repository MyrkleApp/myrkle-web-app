import PouchDB from "pouchdb";
import { IAddExternalWallet } from "../types";

function EXTERNAL_WALLET_DB() {
  const db = new PouchDB("external-wallet-db");

  const getAllData = async () => {
    const allData = await db.allDocs({ include_docs: true });
    return allData.rows.filter((row: any) => !row.value.deleted && row.doc?.address);
  };

  const findWallet = async (wallet: IAddExternalWallet) => {
    const allData = await getAllData();
    const storedWallet = allData.find(
      (x: any) =>
        x.doc?.address === wallet.address && x.doc.walletProvider === wallet.walletProvider,
    );
    return storedWallet;
  };

  const addWallet = async (wallet: IAddExternalWallet) => {
    const walletExists = await findWallet(wallet);

    if (walletExists) {
      return;
    }

    const res = await db.post(wallet);
    return res;
  };

  const clearData = async () => {
    const res = await db.destroy();
    return res;
  };

  return {
    getAllData,
    findWallet,
    addWallet,
    clearData,
  };
}

export default EXTERNAL_WALLET_DB;
