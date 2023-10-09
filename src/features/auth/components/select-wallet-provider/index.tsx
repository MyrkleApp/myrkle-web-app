import MyrkleLogoIcon from "@/icons/logo";
import XummLogoIcon from "@/icons/xumm-logo";
import { Box, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import crossmarkLogo from "@/assets/crossmark-logo.png";
import crossmarkText from "@/assets/crossmark-text.png";
import gemWalletLogo from "@/assets/gem-wallet-logo.png";
import LoginButtonText from "../login-button-text";
import { checkForCrossmark } from "@/features/shared/connections/crossmark";
import Backdrop from "@/components/backdrop";
import DialogBox from "@/components/dialog-box";
import { useState } from "react";
import useCrossmarkSignIn from "../../hooks/use-crossmark-signin";
import { checkForGemWallet } from "@/features/shared/connections/gemwallet";
import useGemWalletSignIn from "../../hooks/use-gemwallet-signin";

export interface SelectWalletProviderProps {
  handleMyrkleClick?: () => void;
  handleXummClick?: () => void;
  handleLoginClick: () => void;
}

function SelectWalletProvider({
  handleMyrkleClick,
  handleXummClick,
  handleLoginClick,
}: SelectWalletProviderProps) {
  const [crossmarkSignIn, { error: crossmarkSignInError }] = useCrossmarkSignIn();
  const [gemWalletSignIn, { error: gemWalletSignInError }] = useGemWalletSignIn();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dialogBoxMessage, setDialogBoxMessage] = useState("");

  const handleCrossmarkClick = () => {
    const isCrossmark = checkForCrossmark();

    if (isCrossmark !== true) {
      setDialogBoxMessage("Please install Crossmark");
      onOpen();
    } else {
      crossmarkSignIn();
      console.log(crossmarkSignInError);
    }
  };

  const handleGemWalletClick = async () => {
    const isGemWallet = await checkForGemWallet();

    if (isGemWallet !== true) {
      setDialogBoxMessage("Please install GemWallet");
      onOpen();
    } else {
      gemWalletSignIn();
      console.log(gemWalletSignInError);
    }
  };

  return (
    <>
      <Box pos="absolute" top="50%" transform="translateY(-50%)">
        <Text fontSize="sm" fontWeight="bold" mb={4} pl={2}>
          Select wallet provider
        </Text>
        <Box bg="secondary" w="300px" h="240px" borderRadius="15px" p="30px 20px">
          <Box overflow="hidden" w="fit-content" h="20px">
            <MyrkleLogoIcon
              fontSize="80px"
              mt="-31px"
              ml="15px"
              cursor="pointer"
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

        <LoginButtonText handleLoginClick={handleLoginClick} />
      </Box>

      <Backdrop isOpen={isOpen} w="100vw" h="100vh" borderRadius="0" top={0}>
        <DialogBox handleClose={onClose} message={dialogBoxMessage} />
      </Backdrop>
    </>
  );
}

export default SelectWalletProvider;
