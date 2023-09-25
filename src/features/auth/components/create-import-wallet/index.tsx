import ArrowLeftIcon from "@/icons/arrow-left";
import MyrkleLogoIcon from "@/icons/logo";
import { Box, Flex, HStack, Image, SimpleGrid, Text } from "@chakra-ui/react";
import newWalletImage from "@/assets/new-wallet.png";
import importWalletImage from "@/assets/import-wallet.png";
import LoginButtonText from "../login-button-text";

export interface CreateImportWalletProps {
  handleBackArrowClick?: () => void;
  handleNewWalletClick?: () => void;
  handleImportWalletClick?: () => void;
  handleLoginClick: () => void;
}

function CreateImportWallet({
  handleBackArrowClick,
  handleNewWalletClick,
  handleImportWalletClick,
  handleLoginClick,
}: CreateImportWalletProps) {
  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack>
        <ArrowLeftIcon cursor="pointer" onClick={handleBackArrowClick} />
        <MyrkleLogoIcon fontSize="80px" ml={3} />
      </HStack>
      <SimpleGrid mt={-3} columns={2} w="350px" h="220px" spacing={3}>
        <Flex
          direction="column"
          justify="space-between"
          align="center"
          p={5}
          borderRadius="15px"
          bg="#D9D9D91A"
          cursor="pointer"
          onClick={handleNewWalletClick}
        >
          <Image src={newWalletImage} alt="" mt={10} h="60px" />
          <Text fontSize="xs">create new wallet</Text>
        </Flex>
        <Flex
          direction="column"
          justify="space-between"
          align="center"
          p={5}
          borderRadius="15px"
          bg="#D9D9D91A"
          cursor="pointer"
          onClick={handleImportWalletClick}
        >
          <Image src={importWalletImage} alt="" mt={10} h="60px" />
          <Text fontSize="xs">import existing wallet</Text>
        </Flex>
      </SimpleGrid>
      <LoginButtonText handleLoginClick={handleLoginClick} />
    </Box>
  );
}

export default CreateImportWallet;
