import { useEffect, useState } from "react";
import { TConnectionStatus } from "@/features/shared/types";
import { socket } from "@/features/shared/socket-io";
import { useDispatch } from "react-redux";
import { signIn } from "@/features/wallet/redux/wallet.slice";
import { ISignIn } from "@/features/wallet/types";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes";

function useXummSignIn() {
  const navigate = useNavigate();

  const [, storeSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  const [signInStatus, setSignInStatus] = useState<TConnectionStatus>("loading");
  const [qrCodeImage, setQrCodeImage] = useState("");

  const dispatch = useDispatch();
  const _signIn = (data: ISignIn) => dispatch(signIn(data));

  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected successfully");
    });

    socket.on("signIn", (res) => {
      if (res.qrCode) {
        setQrCodeImage(res.qrCode);
        return;
      }

      if (!res.txSign) {
        setSignInStatus("failed");
        return;
      }

      const signInData: ISignIn = {
        address: res.account,
        network: res.network.toLowerCase(),
        userToken: res.user_token,
        walletProvider: "xumm",
      };

      _signIn(signInData);
      storeSignInData(signInData);

      navigate(ROUTES.WALLET);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { signInStatus, qrCodeImage };
}

export default useXummSignIn;
