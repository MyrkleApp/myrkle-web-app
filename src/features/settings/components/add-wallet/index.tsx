import Backdrop from "@/components/backdrop";
import Button from "@/components/button";
import DialogBox from "@/components/dialog-box";
import ADD_WALLET_PIPELINE from "@/features/auth/add-wallet-pipeline";
import SelectWalletProvider from "@/features/auth/components/select-wallet-provider";
import XummProvider from "@/features/auth/components/xumm-provider";
import useAddWallet from "@/features/shared/hooks/use-add-wallet";
import { Box, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";

function AddWallet() {
  const [
    { view, isDialogBoxOpen, dialogBoxMessage, qrCodeImage },
    { handleView, onCloseDialogBox, handleXummClick, handleCrossmarkClick, handleGemWalletClick },
  ] = useAddWallet();

  const ref = useRef(null);

  const {
    isOpen: isAddWalletOpen,
    onOpen: onOpenAddWallet,
    onClose: onCloseAddWallet,
  } = useDisclosure();

  const handleAddWalletClose = () => {
    handleView(ADD_WALLET_PIPELINE.WALLET_PROVIDER);
    onCloseAddWallet();
  };

  useOutsideClick({
    ref,
    handler: handleAddWalletClose,
  });

  return (
    <>
      <Button h="30px" onClick={onOpenAddWallet}>
        Add Wallet
      </Button>

      <Backdrop isOpen={isAddWalletOpen}>
        <Box ref={ref} w="fit-content">
          {view === ADD_WALLET_PIPELINE.WALLET_PROVIDER && (
            <SelectWalletProvider
              handleMyrkleClick={() => {
                return;
                handleView(ADD_WALLET_PIPELINE.CREATE_IMPORT_WALLET);
              }}
              handleXummClick={handleXummClick}
              handleCrossmarkClick={handleCrossmarkClick}
              handleGemWalletClick={handleGemWalletClick}
              handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
              hideLogin
              left="50%"
              transform="translate(-50%, -50%)"
            />
          )}

          {view === ADD_WALLET_PIPELINE.XUMM && (
            <XummProvider
              handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.WALLET_PROVIDER)}
              handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
              qrCode={qrCodeImage}
              hideLogin
              left="50%"
              transform="translate(-50%, -50%)"
            />
          )}
        </Box>
      </Backdrop>

      <Backdrop isOpen={isDialogBoxOpen}>
        <DialogBox handleClose={onCloseDialogBox} message={dialogBoxMessage} />
      </Backdrop>
    </>
  );
}

export default AddWallet;
