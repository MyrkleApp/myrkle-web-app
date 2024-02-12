import { getAddress, getNetwork } from "@gemwallet/api";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ISignIn } from "@/features/wallet/types";
import { signIn } from "@/features/wallet/redux/wallet.slice";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes";
// import EXTERNAL_WALLET_DB from "@/services/db/external-wallet-db";
import { IAddExternalWallet } from "@/services/types";
import { checkWalletExists } from "@/helpers";
import { selectMyWallets } from "@/features/wallet/redux/wallet.selectors";
import { selectUserId } from "../redux/auth.selectors";
import { useAddNewWalletMutation } from "@/features/shared/redux/xrp.api";

function useGemWalletSignIn() {
  const navigate = useNavigate();

  const [, storeSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  const myWallets = useSelector(selectMyWallets);
  const userId = useSelector(selectUserId);

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const _signIn = (data: ISignIn) => dispatch(signIn(data));
  // const _addWallet = (data: IWalletAddress) => dispatch(addWallet(data));

  const [addNewWallet] = useAddNewWalletMutation();

  const handleSaveNewWallet = async (wallet: IAddExternalWallet) => {
    if (userId === null) return;

    addNewWallet({
      address: wallet.address,
      provider: wallet.walletProvider,
      user: userId,
    });

    // const db = EXTERNAL_WALLET_DB();
    // await db.addWallet(wallet);
  };

  const gemwalletSignIn = async () => {
    try {
      const address = (await getAddress()).result?.address;
      const network = (await getNetwork()).result?.network;
      if (address && network && userId !== null) {
        const myNetwork: any = network.toLowerCase();

        const isWalletExists = checkWalletExists(myWallets, address, "gemwallet");
        if (isWalletExists) {
          return { isWalletExists };
        }

        _signIn({ address, network: myNetwork, userToken: "", walletProvider: "gemwallet" });
        // _addWallet({ address, walletProvider: "gemwallet", name: "" });
        storeSignInData({
          address,
          network: myNetwork,
          userToken: "",
          walletProvider: "gemwallet",
        });
        handleSaveNewWallet({ address, walletProvider: "gemwallet", userId });
        navigate(ROUTES.WALLET);
      }
    } catch (e) {
      console.log(e);
      setError("Error while signin in");
    }
  };

  return [gemwalletSignIn, { error }] as const;
}

export default useGemWalletSignIn;
