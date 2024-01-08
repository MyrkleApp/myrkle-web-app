import Backdrop from "@/components/backdrop";
import Button from "@/components/button";
import DialogBox from "@/components/dialog-box";
import { TWalletProvider } from "@/features/wallet/types";
import { Box, HStack, Text, useDisclosure, Flex } from "@chakra-ui/react";

export interface AddressItemProps {
  name?: string;
  address: string;
  selectedWalletProvider: TWalletProvider;
  issuerAddress: string;
  handleManagerAddress: (value: string) => void;
  handleManagerWalletProvider: (value: TWalletProvider) => void;
  handleProceed: () => void;
}

function AddressItem({
  name,
  address,
  selectedWalletProvider,
  issuerAddress,
  handleManagerAddress,
  handleProceed,
  handleManagerWalletProvider,
}: AddressItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ======================================================================================================
  // handlers
  // ======================================================================================================

  const handleAddressClick = () => {
    if (address === issuerAddress) return;

    onOpen();
    handleManagerAddress(address);
    handleManagerWalletProvider(selectedWalletProvider);
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
              cursor={address === issuerAddress ? "not-allowed" : "pointer"}
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
        <DialogBox handleClose={onClose} w="350px" h="280px">
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="primary"
            className="font-face-proxima-nova-extrabld"
          >
            Set token manager
          </Text>
          <Text fontSize="sm" fontWeight="bold" mb={3}>
            You are about to take an permanent step that cannot be undone!
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            Ensure that {address} is the currently active wallet on {selectedWalletProvider}.
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
