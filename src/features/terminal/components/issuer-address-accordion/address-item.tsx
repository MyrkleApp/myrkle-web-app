import Backdrop from "@/components/backdrop";
import Button from "@/components/button";
import DialogBox from "@/components/dialog-box";
import { TWalletProvider } from "@/features/wallet/types";
import { Box, HStack, Text, useDisclosure, Flex } from "@chakra-ui/react";

export interface AddressItemProps {
  name?: string;
  address: string;
  selectedWalletProvider: TWalletProvider;
  handleIssuerAddress: (value: string) => void;
  handleIssuerWalletProvider: (value: TWalletProvider) => void;
  handleProceed: () => void;
}

function AddressItem({
  name,
  address,
  selectedWalletProvider,
  handleIssuerAddress,
  handleIssuerWalletProvider,
  handleProceed,
}: AddressItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ======================================================================================================
  // handlers
  // ======================================================================================================

  const handleAddressClick = () => {
    onOpen();
    handleIssuerAddress(address);
    handleIssuerWalletProvider(selectedWalletProvider);
  };

  const handleProceedClick = () => {
    onClose();
    handleProceed();
  };

  return (
    <>
      <Box w="calc(100% - 70px)" mx="auto" mb={2}>
        <HStack mb={2} align="flex-start">
          {name ? (
            <Text fontSize="xs" fontWeight="bold">
              {name}
            </Text>
          ) : (
            <Text
              fontSize="xs"
              color="textDark"
              cursor="pointer"
              onClick={handleAddressClick}
              // maxW="calc(100% - 80px)"
            >
              {address}
            </Text>
          )}
          {/* <Spacer />
          <Box bg="darkest" p="0 5px" borderRadius="4px" onClick={handleCopyAddress}>
            <CopyIcon fill="none" fontSize="sm" cursor="pointer" />
          </Box>
          <CloseButton bg="darkest" size="sm" onClick={onOpenRemoveWallet} /> */}
        </HStack>

        {name && (
          <Text fontSize="xs" color="textDark">
            {address}
          </Text>
        )}
      </Box>

      <Backdrop isOpen={isOpen}>
        <DialogBox handleClose={onClose} h="250px">
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="primary"
            className="font-face-proxima-nova-extrabld"
          >
            Set token issuer
          </Text>
          <Text fontSize="xs" fontWeight="bold">
            You are about to take an permanent step that cannot be undone.
          </Text>
          <Text fontSize="xs" fontWeight="bold">
            Ensure that {address} is the currently active wallet on {selectedWalletProvider}
          </Text>
          <Flex justify="space-between" mt="30px">
            <Button
              h="30px"
              bg="none"
              fontSize="sm"
              color="#fff"
              _hover={{ bg: "none " }}
              onClick={onClose}
            >
              go back
            </Button>
            <Button
              h="30px"
              fontSize="sm"
              mr={2}
              bg="success"
              color="#fff"
              onClick={handleProceedClick}
            >
              proceed
            </Button>
          </Flex>
        </DialogBox>
      </Backdrop>
    </>
  );
}

export default AddressItem;
