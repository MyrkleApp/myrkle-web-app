import { HStack, Image, Text } from "@chakra-ui/react";
import MyrkleLogoIcon from "@/icons/logo";
import XummLogoIcon from "@/icons/xumm-logo";
import crossmarkLogo from "@/assets/crossmark-logo.png";
import crossmarkText from "@/assets/crossmark-text.png";
import gemWalletLogo from "@/assets/gem-wallet-logo.png";
import { TWalletProvider } from "../../types";

interface IProvider {
  name: TWalletProvider;
  logo: React.ReactNode;
}

export const providersList: IProvider[] = [
  { name: "myrkle", logo: <MyrkleLogoIcon fontSize="50px" mt="-13px" /> },
  { name: "xumm", logo: <XummLogoIcon fontSize="50px" mt="-13px" /> },
  {
    name: "crossmark",
    logo: (
      <HStack w="fit-content" mt="5px">
        <Image src={crossmarkLogo} alt="logo" h="13px" />
        <Image src={crossmarkText} alt="logo" h="13px" />
      </HStack>
    ),
  },
  {
    name: "gemwallet",
    logo: (
      <HStack w="fit-content" mt={"2px"}>
        <Image src={gemWalletLogo} alt="logo" h="15px" />
        <Text fontWeight="bold" fontSize="11px" fontFamily="Inter">
          GemWallet
        </Text>
      </HStack>
    ),
  },
];
