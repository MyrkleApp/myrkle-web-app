import ShowSecretNumbers from "@/features/auth/components/secret-numbers/show-secret-numbers";
import Login from "@/features/auth/components/login";
import ShowSeed from "@/features/auth/components/seed/show-seed";
import CreateImportWallet from "@/features/auth/components/create-import-wallet";
import ShowMnemonic from "@/features/auth/components/mnemonic/show-mnemonic";
import CreateWalletOptions from "@/features/auth/components/create-wallet-options";
import SelectWalletProvider from "@/features/auth/components/select-wallet-provider";
import ADD_WALLET_PIPELINE from "@/features/auth/add-wallet-pipeline";
import ImportWalletOptions from "@/features/auth/components/import-wallet-options";
import ImportMnemonic from "@/features/auth/components/mnemonic/import-mnemonic";
import ImportSecretNumbers from "@/features/auth/components/secret-numbers/import-secret-numbers";
import ImportSeed from "@/features/auth/components/seed/import-seed";
import ImportPrivateKey from "@/features/auth/components/private-key/import-private-key";
import XummProvider from "@/features/auth/components/xumm-provider";
import HomeLayout from "@/layout/home-layout";
import CreatePassword from "@/features/auth/components/create-password";
import Backdrop from "@/components/backdrop";
import DialogBox from "@/components/dialog-box";
import useAddWallet from "@/features/shared/hooks/use-add-wallet";

function Auth() {
  const [
    { view, isDialogBoxOpen, dialogBoxMessage, qrCodeImage },
    { handleView, onCloseDialogBox, handleXummClick, handleCrossmarkClick, handleGemWalletClick },
  ] = useAddWallet();

  return (
    <>
      <HomeLayout>
        {view === ADD_WALLET_PIPELINE.CREATE_PASSWORD && (
          <CreatePassword
            handleConfirmClick={() => handleView(ADD_WALLET_PIPELINE.WALLET_PROVIDER)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
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
          />
        )}
        {view === ADD_WALLET_PIPELINE.CREATE_IMPORT_WALLET && (
          <CreateImportWallet
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.WALLET_PROVIDER)}
            handleNewWalletClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_WALLET_OPTIONS)}
            handleImportWalletClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.CREATE_WALLET_OPTIONS && (
          <CreateWalletOptions
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_IMPORT_WALLET)}
            handleMnemonicClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_MNEMONIC)}
            handleSecretNumbersClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_SECRET_NUMBERS)}
            handleSeedClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_SEED)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.CREATE_MNEMONIC && (
          <ShowMnemonic
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.CREATE_SECRET_NUMBERS && (
          <ShowSecretNumbers
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.CREATE_SEED && (
          <ShowSeed
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}

        {/* import */}
        {view === ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS && (
          <ImportWalletOptions
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_IMPORT_WALLET)}
            handleMnemonicClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_MNEMONIC)}
            handleSecretNumbersClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_SECRET_NUMBERS)}
            handleSeedClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_SEED)}
            handlePrivateKeyClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_PRIVATE_KEY)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.IMPORT_MNEMONIC && (
          <ImportMnemonic
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.IMPORT_SECRET_NUMBERS && (
          <ImportSecretNumbers
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.IMPORT_SEED && (
          <ImportSeed
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.IMPORT_PRIVATE_KEY && (
          <ImportPrivateKey
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.XUMM && (
          <XummProvider
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.WALLET_PROVIDER)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
            qrCode={qrCodeImage}
          />
        )}

        {view === ADD_WALLET_PIPELINE.LOGIN && (
          <Login handleRegisterClick={() => handleView(ADD_WALLET_PIPELINE.WALLET_PROVIDER)} />
        )}
      </HomeLayout>

      <Backdrop isOpen={isDialogBoxOpen} w="100vw" h="100vh" borderRadius="0" top={0}>
        <DialogBox handleClose={onCloseDialogBox} message={dialogBoxMessage} />
      </Backdrop>
    </>
  );
}

export default Auth;
