import Backdrop from "@/components/backdrop";
import Button from "@/components/button";
import ConnectXummModal from "@/components/connect-xumm-modal";
import DialogBox from "@/components/dialog-box";
import ToastElement from "@/components/toast-element";
import useXummSignIn from "@/features/auth/hooks/use-xumm-signin";
import { socket, xummSignInJson } from "@/features/shared/socket-io";
import { selectWalletProvider } from "@/features/wallet/redux/wallet.selectors";
import { setAddress, setWalletProvider } from "@/features/wallet/redux/wallet.slice";
import { ISignIn, TWalletProvider } from "@/features/wallet/types";
import CopyIcon from "@/icons/copy";
import {
  Box,
  HStack,
  Spacer,
  CloseButton,
  Text,
  useToast,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "react-use";

export interface AddressItemProps {
  name?: string;
  address: string;
  selectedWalletProvider: TWalletProvider;
}

function AddressItem({ name, address, selectedWalletProvider }: AddressItemProps) {
  const [signInData, storeSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  const currentWalletProvider = useSelector(selectWalletProvider);

  const isActiveWalletProvider = currentWalletProvider === selectedWalletProvider;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { qrCodeImage } = useXummSignIn();

  // ======================================================================================================
  // dispatch
  // ======================================================================================================

  const dispatch = useDispatch();
  const _setAddress = (address: string) => dispatch(setAddress(address));
  const _setWalletProvider = (provider: TWalletProvider) => dispatch(setWalletProvider(provider));

  const toast = useToast({
    position: "top",
    containerStyle: {
      ml: "400px",
      width: "200px",
    },
  });

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(address);
    toast({
      render: () => <ToastElement />,
    });
  };

  const handleAddressClick = () => {
    if (isActiveWalletProvider) return;
    onOpen();

    if (selectedWalletProvider === "xumm") {
      socket.emit("signIn", xummSignInJson);
    }
  };

  const handleSwitchWallet = () => {
    if (signInData !== undefined) {
      storeSignInData({
        ...signInData,
        address,
        walletProvider: selectedWalletProvider,
      });
    }

    _setAddress(address);
    _setWalletProvider(selectedWalletProvider);
    onClose();
  };

  return (
    <>
      <Box w="calc(100% - 70px)" mx="auto" mb={2}>
        <HStack mb={2}>
          {name ? (
            <Text fontSize="xs" fontWeight="bold">
              {name}
            </Text>
          ) : (
            <Text
              fontSize="xs"
              color="textDark"
              cursor={isActiveWalletProvider ? "not-allowed" : "pointer"}
              onClick={handleAddressClick}
            >
              {address}
            </Text>
          )}
          <Spacer />
          <Box bg="darkest" p="0 5px" borderRadius="4px" onClick={handleCopyAddress}>
            <CopyIcon fill="none" fontSize="sm" cursor="pointer" />
          </Box>
          <CloseButton bg="darkest" size="sm" />
        </HStack>

        {name && (
          <Text fontSize="xs" color="textDark">
            {address}
          </Text>
        )}
      </Box>

      <Backdrop isOpen={isOpen}>
        {selectedWalletProvider === "xumm" ? (
          <ConnectXummModal qrCodeImage={qrCodeImage} handleClose={onClose} />
        ) : (
          <DialogBox handleClose={onClose}>
            <Text fontSize="sm" fontWeight="bold">
              Switch active wallet?
            </Text>
            <Flex mt={16} justify="flex-end">
              <Button h="35px" mr={3} onClick={handleSwitchWallet}>
                Proceed
              </Button>
              <Button h="35px" bg="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </DialogBox>
        )}
      </Backdrop>
    </>
  );
}

export default AddressItem;
