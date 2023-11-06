import { Box, HStack, Image, Text } from "@chakra-ui/react";
import WalletAccordion from "../wallet-accordion";
import MyrkleLogoIcon from "@/icons/logo";
import XummLogoIcon from "@/icons/xumm-logo";
import crossmarkLogo from "@/assets/crossmark-logo.png";
import crossmarkText from "@/assets/crossmark-text.png";
import gemWalletLogo from "@/assets/gem-wallet-logo.png";
import { useSelector } from "react-redux";
import { selectMyWallets } from "@/features/wallet/redux/wallet.selectors";
import { TWalletProvider } from "@/features/wallet/types";

function ListWalletProviders() {
  const myWallets = useSelector(selectMyWallets);

  const getProviderWallets = (provider: TWalletProvider) => {
    return myWallets.filter((wallet) => wallet.walletProvider === provider);
  };

  return (
    <Box>
      <WalletAccordion
        logo={<MyrkleLogoIcon fontSize="80px" />}
        wallets={getProviderWallets("myrkle")}
        isDisabled
        walletProvider="myrkle"
      />
      <Text fontSize="sm" fontWeight="bold" my={4}>
        External connected wallets
      </Text>
      <WalletAccordion
        mb={5}
        logo={<XummLogoIcon fontSize="80px" />}
        wallets={getProviderWallets("xumm")}
        walletProvider="xumm"
      />
      <WalletAccordion
        logo={
          <HStack cursor="pointer" w="fit-content">
            <Image src={crossmarkLogo} alt="logo" h="20px" />
            <Image src={crossmarkText} alt="logo" h="20px" />
          </HStack>
        }
        mb={5}
        wallets={getProviderWallets("crossmark")}
        walletProvider="crossmark"
      />
      <WalletAccordion
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
      />
    </Box>
  );
}

export default ListWalletProviders;
