import MyrkleLogoIcon from "@/icons/logo";
import XummLogoIcon from "@/icons/xumm-logo";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import crossmarkLogo from "@/assets/crossmark-logo.png";
import crossmarkText from "@/assets/crossmark-text.png";
import gemWalletLogo from "@/assets/gem-wallet-logo.png";
import LoginButtonText from "../login-button-text";

export interface SelectWalletProviderProps {
  handleMyrkleClick?: () => void;
  handleXummClick?: () => void;
  handleCrossmarkClick?: () => void;
  handleGemWalletClick?: () => void;
  handleLoginClick?: () => void;
  hideLogin?: boolean;
  [anyProp: string]: any;
}

function SelectWalletProvider({
  handleMyrkleClick,
  handleXummClick,
  handleCrossmarkClick,
  handleGemWalletClick,
  handleLoginClick,
  hideLogin,
  ...props
}: SelectWalletProviderProps) {
  return (
    <>
      <Box pos="absolute" top="50%" transform="translateY(-50%)" {...props}>
        <Text fontSize="sm" fontWeight="bold" mb={4} pl={2}>
          Select wallet provider
        </Text>
        <Box bg="secondary" w="300px" h="240px" borderRadius="15px" p="30px 20px">
          <Box overflow="hidden" w="fit-content" h="20px">
            <MyrkleLogoIcon
              fontSize="80px"
              mt="-31px"
              ml="15px"
              opacity={0.4}
              cursor="not-allowed"
              onClick={handleMyrkleClick}
            />
          </Box>
          <Box as="hr" borderTop="1px solid gray" mt="15px" />

          <Box overflow="hidden" w="fit-content" h="20px" mt="15px">
            <XummLogoIcon
              fontSize="75px"
              mt="-28px"
              ml="15px"
              cursor="pointer"
              onClick={handleXummClick}
            />
          </Box>
          <Box as="hr" borderTop="1px solid gray" mt="15px" />

          <Box borderBottom="1px solid gray" p="15px">
            <HStack w="fit-content" cursor="pointer" onClick={handleCrossmarkClick}>
              <Image src={crossmarkLogo} alt="logo" h="20px" />
              <Image src={crossmarkText} alt="logo" h="20px" />
            </HStack>
          </Box>

          <Box p="15px">
            <HStack w="fit-content" cursor="pointer" onClick={handleGemWalletClick}>
              <Image src={gemWalletLogo} alt="logo" h="20px" />
              <Text fontWeight="bold" fontFamily="Inter">
                GemWallet
              </Text>
            </HStack>
          </Box>
        </Box>

        {!hideLogin && <LoginButtonText handleLoginClick={handleLoginClick} />}
      </Box>
    </>
  );
}

export default SelectWalletProvider;
