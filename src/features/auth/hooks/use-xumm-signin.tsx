import { useEffect, useState } from "react";
import { TConnectionStatus } from "@/features/shared/types";
import { socket } from "@/features/shared/socket-io";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "@/features/wallet/redux/wallet.slice";
import { ISignIn } from "@/features/wallet/types";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes";
import { IAddExternalWallet } from "@/services/types";
// import EXTERNAL_WALLET_DB from "@/services/db/external-wallet-db";
import { selectMyWallets } from "@/features/wallet/redux/wallet.selectors";
import { checkWalletExists } from "@/helpers";
import { selectUserId } from "../redux/auth.selectors";
import { useAddNewWalletMutation } from "@/features/shared/redux/xrp.api";

function useXummSignIn(handleCloseModal: () => void) {
  const navigate = useNavigate();

  const [, storeSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  const myWallets = useSelector(selectMyWallets);
  const userId = useSelector(selectUserId);

  const [signInStatus, setSignInStatus] = useState<TConnectionStatus>("loading");
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isXummWalletExists, setXummWalletExists] = useState<null | boolean>(null);

  const [addNewWallet] = useAddNewWalletMutation();

  const dispatch = useDispatch();
  const _signIn = (data: ISignIn) => dispatch(signIn(data));
  // const _addWallet = (data: IWalletAddress) => dispatch(addWallet(data));

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

    if (walletAddress && userId !== null) {
      const isWalletExists = checkWalletExists(myWallets, walletAddress, "xumm");
      if (isWalletExists) {
        setXummWalletExists(true);
        return;
      } else {
        setXummWalletExists(false);
      }

      handleSaveNewWallet({ address: walletAddress, walletProvider: "xumm", userId });
      navigate(ROUTES.WALLET);
      // _addWallet({ address: walletAddress, walletProvider: "xumm", name: "" });

      if (handleCloseModal) {
        handleCloseModal();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, walletAddress]);

  return { signInStatus, qrCodeImage, resetSignInQrCode, isXummWalletExists };
}

export default useXummSignIn;
