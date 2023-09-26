import ShowSecretNumbers from "@/features/auth/components/secret-numbers/show-secret-numbers";
import Login from "@/features/auth/components/login";
import { useState } from "react";
import ShowSeed from "@/features/auth/components/seed/show-seed";
import CreateImportWallet from "@/features/auth/components/create-import-wallet";
import ShowMnemonic from "@/features/auth/components/mnemonic/show-mnemonic";
import CreateWalletOptions from "@/features/auth/components/create-wallet-options";
import SelectWalletProvider from "@/features/auth/components/select-wallet-provider";
import VIEW_ROUTES from "@/features/auth/view-routes";
import ImportWalletOptions from "@/features/auth/components/import-wallet-options";
import ImportMnemonic from "@/features/auth/components/mnemonic/import-mnemonic";
import ImportSecretNumbers from "@/features/auth/components/secret-numbers/import-secret-numbers";
import ImportSeed from "@/features/auth/components/seed/import-seed";
import ImportPrivateKey from "@/features/auth/components/private-key/import-private-key";
import XummProvider from "@/features/auth/components/xumm-provider";
import HomeLayout from "@/layout/home-layout";
import CreatePassword from "@/features/auth/components/create-password";

function Home() {
  const [view, setView] = useState(VIEW_ROUTES.CREATE_PASSWORD);

  const handleView = (view: string) => setView(view);

  return (
    <HomeLayout>
      {view === VIEW_ROUTES.CREATE_PASSWORD && (
        <CreatePassword
          handleConfirmClick={() => handleView(VIEW_ROUTES.WALLET_PROVIDER)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.WALLET_PROVIDER && (
        <SelectWalletProvider
          handleMyrkleClick={() => handleView(VIEW_ROUTES.CREATE_IMPORT_WALLET)}
          handleXummClick={() => handleView(VIEW_ROUTES.XUMM)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.CREATE_IMPORT_WALLET && (
        <CreateImportWallet
          handleBackArrowClick={() => handleView(VIEW_ROUTES.WALLET_PROVIDER)}
          handleNewWalletClick={() => handleView(VIEW_ROUTES.CREATE_WALLET_OPTIONS)}
          handleImportWalletClick={() => handleView(VIEW_ROUTES.IMPORT_WALLET_OPTIONS)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.CREATE_WALLET_OPTIONS && (
        <CreateWalletOptions
          handleBackArrowClick={() => handleView(VIEW_ROUTES.CREATE_IMPORT_WALLET)}
          handleMnemonicClick={() => handleView(VIEW_ROUTES.CREATE_MNEMONIC)}
          handleSecretNumbersClick={() => handleView(VIEW_ROUTES.CREATE_SECRET_NUMBERS)}
          handleSeedClick={() => handleView(VIEW_ROUTES.CREATE_SEED)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.CREATE_MNEMONIC && (
        <ShowMnemonic
          handleBackArrowClick={() => handleView(VIEW_ROUTES.CREATE_WALLET_OPTIONS)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.CREATE_SECRET_NUMBERS && (
        <ShowSecretNumbers
          handleBackArrowClick={() => handleView(VIEW_ROUTES.CREATE_WALLET_OPTIONS)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.CREATE_SEED && (
        <ShowSeed
          handleBackArrowClick={() => handleView(VIEW_ROUTES.CREATE_WALLET_OPTIONS)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}

      {/* import */}
      {view === VIEW_ROUTES.IMPORT_WALLET_OPTIONS && (
        <ImportWalletOptions
          handleBackArrowClick={() => handleView(VIEW_ROUTES.CREATE_IMPORT_WALLET)}
          handleMnemonicClick={() => handleView(VIEW_ROUTES.IMPORT_MNEMONIC)}
          handleSecretNumbersClick={() => handleView(VIEW_ROUTES.IMPORT_SECRET_NUMBERS)}
          handleSeedClick={() => handleView(VIEW_ROUTES.IMPORT_SEED)}
          handlePrivateKeyClick={() => handleView(VIEW_ROUTES.IMPORT_PRIVATE_KEY)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.IMPORT_MNEMONIC && (
        <ImportMnemonic
          handleBackArrowClick={() => handleView(VIEW_ROUTES.IMPORT_WALLET_OPTIONS)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.IMPORT_SECRET_NUMBERS && (
        <ImportSecretNumbers
          handleBackArrowClick={() => handleView(VIEW_ROUTES.IMPORT_WALLET_OPTIONS)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.IMPORT_SEED && (
        <ImportSeed
          handleBackArrowClick={() => handleView(VIEW_ROUTES.IMPORT_WALLET_OPTIONS)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.IMPORT_PRIVATE_KEY && (
        <ImportPrivateKey
          handleBackArrowClick={() => handleView(VIEW_ROUTES.IMPORT_WALLET_OPTIONS)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}
      {view === VIEW_ROUTES.XUMM && (
        <XummProvider
          handleBackArrowClick={() => handleView(VIEW_ROUTES.WALLET_PROVIDER)}
          handleLoginClick={() => handleView(VIEW_ROUTES.LOGIN)}
        />
      )}

      {view === VIEW_ROUTES.LOGIN && (
        <Login handleRegisterClick={() => handleView(VIEW_ROUTES.WALLET_PROVIDER)} />
      )}
    </HomeLayout>
  );
}

export default Home;
