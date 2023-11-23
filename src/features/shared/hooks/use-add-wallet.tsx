import ADD_WALLET_PIPELINE from "@/features/auth/add-wallet-pipeline";
import useCrossmarkSignIn from "@/features/auth/hooks/use-crossmark-signin";
import useGemWalletSignIn from "@/features/auth/hooks/use-gemwallet-signin";
import useXummSignIn from "@/features/auth/hooks/use-xumm-signin";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { socket, xummSignInJson } from "../socket-io";
import { checkForCrossmark } from "../connections/crossmark";
import { checkForGemWallet } from "../connections/gemwallet";

function useAddWallet() {
  const [crossmarkSignIn, { error: crossmarkSignInError }] = useCrossmarkSignIn();
  const [gemWalletSignIn, { error: gemWalletSignInError }] = useGemWalletSignIn();

  const [view, setView] = useState(ADD_WALLET_PIPELINE.WALLET_PROVIDER);

  const handleView = (view: string) => setView(view);
  const [dialogBoxMessage, setDialogBoxMessage] = useState("");

  const {
    isOpen: isDialogBoxOpen,
    onOpen: onOpenDialogBox,
    onClose: onCloseDialogBox,
  } = useDisclosure();

  const { qrCodeImage } = useXummSignIn(onCloseDialogBox);

  const handleXummClick = () => {
    handleView(ADD_WALLET_PIPELINE.XUMM);
    socket.emit("signIn", xummSignInJson);
  };

  const handleCrossmarkClick = () => {
    const isCrossmark = checkForCrossmark();

    if (isCrossmark !== true) {
      setDialogBoxMessage("Please install Crossmark");
      onOpenDialogBox();
    } else {
      crossmarkSignIn();
      console.log(crossmarkSignInError);
    }
  };

  const handleGemWalletClick = async () => {
    const isGemWallet = await checkForGemWallet();

    if (isGemWallet !== true) {
      setDialogBoxMessage("Please install GemWallet");
      onOpenDialogBox();
    } else {
      gemWalletSignIn();
      console.log(gemWalletSignInError);
    }
  };

  return [
    { view, isDialogBoxOpen, dialogBoxMessage, qrCodeImage },
    {
      handleView,
      onOpenDialogBox,
      onCloseDialogBox,
      handleXummClick,
      handleCrossmarkClick,
      handleGemWalletClick,
    },
  ] as const;
}

export default useAddWallet;
