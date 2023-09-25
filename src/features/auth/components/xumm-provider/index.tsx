import ArrowLeftIcon from "@/icons/arrow-left";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import XummLogoIcon from "@/icons/xumm-logo";
import LoginButtonText from "../login-button-text";
import qrCode from "@/assets/qr-code.png";

export interface XummProviderProps {
  handleBackArrowClick?: () => void;
  handleLoginClick: () => void;
}

function XummProvider({ handleBackArrowClick, handleLoginClick }: XummProviderProps) {
  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack>
        <ArrowLeftIcon cursor="pointer" onClick={handleBackArrowClick} />
        <XummLogoIcon fontSize="80px" ml={3} />
      </HStack>
      <Box bg="secondary" w="230px" h="250px" borderRadius="15px" p="30px 20px 30px 20px">
        <Box bg="#fff" borderRadius="15px" w="83%" mx="auto">
          <Image src={qrCode} alt="" />
        </Box>
        <Text fontSize="xs" textAlign="center" mt={8}>
          Scan QR code to sign in with xumm
        </Text>
      </Box>
      <LoginButtonText handleLoginClick={handleLoginClick} />
    </Box>
  );
}

export default XummProvider;
