import { useEffect, useState } from "react";
import { TConnectionStatus } from "@/features/shared/types";
import { socket } from "@/features/shared/socket-io";
import { useDispatch } from "react-redux";
import { addWallet, signIn } from "@/features/wallet/redux/wallet.slice";
import { ISignIn, IWalletAddress } from "@/features/wallet/types";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes";
import { IAddExternalWallet } from "@/services/types";
import EXTERNAL_WALLET_DB from "@/services/db/external-wallet-db";

function useXummSignIn() {
  const navigate = useNavigate();

  const [, storeSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  const [signInStatus, setSignInStatus] = useState<TConnectionStatus>("loading");
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const dispatch = useDispatch();
  const _signIn = (data: ISignIn) => dispatch(signIn(data));
  const _addWallet = (data: IWalletAddress) => dispatch(addWallet(data));

  const resetSignInQrCode = () => setQrCodeImage("");

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
      setWalletAddress(signInData.address);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleSaveInBrowserDB = async (wallet: IAddExternalWallet) => {
      const db = EXTERNAL_WALLET_DB();
      await db.addWallet(wallet);
    };

    if (walletAddress) {
      handleSaveInBrowserDB({ address: walletAddress, walletProvider: "xumm" });
      navigate(ROUTES.WALLET);
      _addWallet({ address: walletAddress, walletProvider: "xumm", name: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, walletAddress]);

  return { signInStatus, qrCodeImage, resetSignInQrCode };
}

export default useXummSignIn;
