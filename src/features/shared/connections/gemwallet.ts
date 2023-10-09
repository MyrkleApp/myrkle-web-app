import { isInstalled, getAddress, getNetwork, submitTransaction, on } from "@gemwallet/api";

export const checkForGemWallet = async () => {
  try {
    const result = await isInstalled();
    return result.result.isInstalled;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const signIn = async () => {
  try {
    const address = (await getAddress()).result?.address;
    const network = (await getNetwork()).result?.network;
    if (address && network) {
      return { address, network, connected: true };
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const submitTxn = async (transaction: any) => {
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

export const eventHandler = () => {
  try {
    on("networkChanged", async (resp: any) => {
      const network = resp.network.name;
      console.log(network);
      return { network };
    });

    on("walletChanged", (resp: any) => {
      const address = resp.wallet.publicAddress;
      console.log(address);
      return { address };
    });
  } catch (e) {
    console.log(e);
  }
};
