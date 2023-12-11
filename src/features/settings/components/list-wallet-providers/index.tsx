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
import ItemDescription from "@/components/item-description";

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
      <HStack>
        <Text fontSize="sm" fontWeight="bold" my={4}>
          External connected wallets
        </Text>
        <ItemDescription
          description="Switching wallets within the app doesn't impact your wallet state on Crossmark and GemWallet. To ensure smooth transactions, use your active wallet (as displayed on Crossmark and GemWallet) when making payments."
          top={7}
          left={-150}
          w="210px"
          h="130px"
        />
      </HStack>
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
