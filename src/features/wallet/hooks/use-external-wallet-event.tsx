import { checkForCrossmark } from "@/features/shared/connections/crossmark";
import { on } from "@gemwallet/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMyWallets } from "../redux/wallet.selectors";

function useExternalWalletEvent() {
  const [provider, setProvider] = useState<"" | "crossmark" | "gemwallet">("");
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");

  const myWallets = useSelector(selectMyWallets);

  const isWalletInStorage = !!myWallets.find(
    (wallet) => wallet.address === address && wallet.walletProvider === provider,
  );

  const resetState = () => {
    setProvider("");
    setAddress("");
    setNetwork("");
  };

  // ==============================================================================================
  // crossmark
  // ==============================================================================================

  useEffect(() => {
    // try {
    // setTimeout(async () => {
    if (checkForCrossmark() === true) {
      type CrossmarkSdk = {
        on: (
          event: "user-change" | "network-change" | "signout",
          callback: (data?: { network?: { type: string } }) => void,
        ) => void;
        session: { address: string; network?: { type: string } };
      };
      const sdk = window.xrpl.crossmark as unknown as CrossmarkSdk;

      sdk.on("user-change", () => {
        try {
          const address = sdk.session.address;
          const resp = {
            address,
            // network: sdk.session.network.type === "test" ? "TESTNET" : "MAINNET",
            // connected: address ? true : false,
          };
          console.log("userchange");
          console.log(resp);
          setAddress(String(resp.address));
          setProvider("crossmark");
        } catch (e) {
          console.log(e);
          // return e;
        }
      });
      sdk.on("network-change", (res: any) => {
        try {
          const address = sdk.session.address;
          const resp = {
            address,
            network: res.network.type === "test" ? "TESTNET" : "MAINNET",
            connected: address ? true : false,
          };
          console.log("netchange");
          console.log(resp);
          setProvider("crossmark");
        } catch (e) {
          console.log(e);
          // return e;
        }
      });
    }
    // }, 5000)
    // } catch (e) {
    //   console.log(e);
    //   return e;
    // }
  }, []);

  // ==============================================================================================
  // gemwallet
  // ==============================================================================================

  useEffect(() => {
    try {
      on("networkChanged", async (resp: any) => {
        const network = resp.network.name;
        // console.log(network);
        const processedNetwork = network?.toLowerCase()?.includes("test")
          ? "testnet"
          : network?.toLowerCase()?.includes("main")
          ? "mainnet"
          : "devnet";
        setNetwork(processedNetwork);
        setProvider("gemwallet");
      });

      on("walletChanged", (resp: any) => {
        const address = resp.wallet.publicAddress;
        console.log("gemwallet address >>> ", address);
        setAddress(address);
        setProvider("gemwallet");
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {
    newExternalProvider: provider,
    newAddress: address,
    newNetwork: network,
    isWalletInStorage,
    resetExternalProviderState: resetState,
  } as const;
}

export default useExternalWalletEvent;
