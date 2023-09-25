import ArrowLeftIcon from "@/icons/arrow-left";
import { Box, HStack, Text } from "@chakra-ui/react";
import MyrkleLogoIcon from "@/icons/logo";
import LoginButtonText from "../login-button-text";

export interface ImportWalletOptionsProps {
  handleBackArrowClick?: () => void;
  handleMnemonicClick?: () => void;
  handleSecretNumbersClick?: () => void;
  handleSeedClick?: () => void;
  handlePrivateKeyClick?: () => void;
  handleLoginClick: () => void;
}

function ImportWalletOptions({
  handleBackArrowClick,
  handleMnemonicClick,
  handleSecretNumbersClick,
  handleSeedClick,
  handlePrivateKeyClick,
  handleLoginClick,
}: ImportWalletOptionsProps) {
  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack>
        <ArrowLeftIcon cursor="pointer" onClick={handleBackArrowClick} />
        <MyrkleLogoIcon fontSize="80px" ml={3} />
      </HStack>
      <Text mt={-3} mb={3} color="textDark" fontSize="xs">
        import new wallet with
      </Text>
      <Box bg="secondary" w="300px" h="240px" borderRadius="15px" p="10px 20px 30px 20px">
        <HStack borderBottom="1px solid gray" p="15px">
          <Text fontSize="sm" fontWeight="bold" cursor="pointer" onClick={handleMnemonicClick}>
            Mnemonic
          </Text>
        </HStack>
        <HStack borderBottom="1px solid gray" p="15px">
          <Text fontSize="sm" fontWeight="bold" cursor="pointer" onClick={handleSecretNumbersClick}>
            Secret numbers
          </Text>
        </HStack>
        <HStack borderBottom="1px solid gray" p="15px">
          <Text fontSize="sm" fontWeight="bold" cursor="pointer" onClick={handleSeedClick}>
            Seed
          </Text>
        </HStack>
        <HStack p="15px">
          <Text fontSize="sm" fontWeight="bold" cursor="pointer" onClick={handlePrivateKeyClick}>
            Private Key
          </Text>
        </HStack>
      </Box>
      <LoginButtonText handleLoginClick={handleLoginClick} />
    </Box>
  );
}

export default ImportWalletOptions;
