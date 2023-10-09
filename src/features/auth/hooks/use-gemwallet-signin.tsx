import { getAddress, getNetwork } from "@gemwallet/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ISignIn } from "@/features/wallet/types";
import { signIn } from "@/features/wallet/redux/wallet.slice";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes";

function useGemWalletSignIn() {
  const navigate = useNavigate();

  const [, storeSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const _signIn = (data: ISignIn) => dispatch(signIn(data));

  const gemwalletSignIn = async () => {
    try {
      const address = (await getAddress()).result?.address;
      const network = (await getNetwork()).result?.network;
      if (address && network) {
        const myNetwork: any = network.toLowerCase();
        _signIn({ address, network: myNetwork, userToken: "" });
        storeSignInData({ address, network: myNetwork, userToken: "" });
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
