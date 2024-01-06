import ItemLabel from "@/components/item-label";
import { selectMyWallets } from "@/features/wallet/redux/wallet.selectors";
import { TWalletProvider } from "@/features/wallet/types";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import IssuerAddressAccordion from "../issuer-address-accordion";
import MyrkleLogoIcon from "@/icons/logo";
import XummLogoIcon from "@/icons/xumm-logo";
import crossmarkLogo from "@/assets/crossmark-logo.png";
import crossmarkText from "@/assets/crossmark-text.png";
import gemWalletLogo from "@/assets/gem-wallet-logo.png";
import { useAccountSetIssuerMutation } from "@/features/shared/redux/xrp.api";
import { TTxnPipeline } from "@/features/shared/types";
import { useEffect, useState } from "react";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { TMintTokenStep } from "../../types";
import Backdrop from "@/components/backdrop";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";
import MintTokenProgress from "./mint-token-progress";

export interface IssuerProps {
  issuerAddress: string;
  tickSize: null | number;
  transferFee: string;
  domain: string;
  issuerWalletProvider: TWalletProvider;
  handleIssuerAddress: (value: string) => void;
  handleIssuerWalletProvider: (value: TWalletProvider) => void;
  handleMintTokenStep: (val: TMintTokenStep) => void;
}

function Issuer({
  issuerAddress,
  domain,
  tickSize,
  transferFee,
  issuerWalletProvider,
  handleIssuerAddress,
  handleIssuerWalletProvider,
  handleMintTokenStep,
}: IssuerProps) {
  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("");

  const myWallets = useSelector(selectMyWallets);

  const [view, setView] = useState<TTxnPipeline>("default");

  const [accountSetIssuer] = useAccountSetIssuerMutation();

  // ===========================================================================================
  // effects
  // ===========================================================================================

  useEffect(() => {
    if (xummTxnQrCode) {
      setView("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      handleMintTokenStep("manager");
    } else setView("error-2");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitTxnSuccess]);

  const getProviderWallets = (provider: TWalletProvider) => {
    return myWallets.filter((wallet) => wallet.walletProvider === provider);
  };

  const handleAccountSetManager = () => {
    setView("loading");

    accountSetIssuer({
      issuer_addr: issuerAddress,
      ticksize: String(tickSize),
      transferfee: transferFee,
      domain,
    })
      .unwrap()
      .then((res) => {
        handleSubmitTxn(res, issuerWalletProvider);
      })
      .catch(() => setView("error-1"));
  };

  const handleReset = () => {
    resetSubmitTxnResponse();
    setView("default");
  };

  return (
    <>
      <MintTokenProgress currentStep={1} />
      <Box px={3}>
        <ItemLabel title="Set Issuer" fontSize="md" />
        <IssuerAddressAccordion
          mb={5}
          logo={<MyrkleLogoIcon fontSize="80px" />}
          wallets={getProviderWallets("myrkle")}
          isDisabled
          walletProvider="myrkle"
          handleIssuerAddress={handleIssuerAddress}
          handleIssuerWalletProvider={handleIssuerWalletProvider}
          handleProceed={handleAccountSetManager}
        />
        <IssuerAddressAccordion
          mb={5}
          logo={<XummLogoIcon fontSize="80px" />}
          wallets={getProviderWallets("xumm")}
          walletProvider="xumm"
          handleIssuerAddress={handleIssuerAddress}
          handleIssuerWalletProvider={handleIssuerWalletProvider}
          handleProceed={handleAccountSetManager}
        />
        <IssuerAddressAccordion
          logo={
            <HStack cursor="pointer" w="fit-content">
              <Image src={crossmarkLogo} alt="logo" h="20px" />
              <Image src={crossmarkText} alt="logo" h="20px" />
            </HStack>
          }
          mb={5}
          wallets={getProviderWallets("crossmark")}
          walletProvider="crossmark"
          handleIssuerAddress={handleIssuerAddress}
          handleIssuerWalletProvider={handleIssuerWalletProvider}
          handleProceed={handleAccountSetManager}
        />
        <IssuerAddressAccordion
          logo={
            <HStack cursor="pointer" w="fit-content">
              <Image src={gemWalletLogo} alt="logo" h="20px" />
              <Text fontWeight="bold" fontFamily="Inter">
                GemWallet
              </Text>
            </HStack>
          }
          wallets={getProviderWallets("gemwallet")}
          walletProvider="gemwallet"
          handleIssuerAddress={handleIssuerAddress}
          handleIssuerWalletProvider={handleIssuerWalletProvider}
          handleProceed={handleAccountSetManager}
        />
      </Box>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}
        {view === "error-1" && (
          <ResponseModal isError={true} message="Something went wrong" handleClose={handleReset} />
        )}
        {view === "xumm-qr-code" && (
          <XummTxnModal qrCodeImage={xummTxnQrCode} handleClose={handleReset} />
        )}
        {view === "error-2" && (
          <ResponseModal isError={true} message={submitTxnResponseMsg} handleClose={handleReset} />
        )}
      </Backdrop>
    </>
  );
}

export default Issuer;
