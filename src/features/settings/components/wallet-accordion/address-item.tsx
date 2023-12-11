import Backdrop from "@/components/backdrop";
import Button from "@/components/button";
import DialogBox from "@/components/dialog-box";
import ToastElement from "@/components/toast-element";
import { socket, xummSignInJson } from "@/features/shared/socket-io";
import { selectWalletProvider } from "@/features/wallet/redux/wallet.selectors";
import { removeWallet, setAddress, setWalletProvider } from "@/features/wallet/redux/wallet.slice";
import { ISignIn, IWalletAddress, TWalletProvider } from "@/features/wallet/types";
import CopyIcon from "@/icons/copy";
import EXTERNAL_WALLET_DB from "@/services/db/external-wallet-db";
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

  const toast = useToast({
    position: "top",
    containerStyle: {
      ml: "400px",
      width: "200px",
    },
  });

  const currentWalletProvider = useSelector(selectWalletProvider);

  const isActiveWalletProvider = currentWalletProvider === selectedWalletProvider;
  const isPreventSwitchWallet = isActiveWalletProvider && currentWalletProvider !== "xumm";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRemoveWalletOpen,
    onOpen: onOpenRemoveWallet,
    onClose: onCloseRemoveWallet,
  } = useDisclosure();

  // ======================================================================================================
  // dispatch
  // ======================================================================================================

  const dispatch = useDispatch();
  const _setAddress = (address: string) => dispatch(setAddress(address));
  const _setWalletProvider = (provider: TWalletProvider) => dispatch(setWalletProvider(provider));
  const _removeWallet = (wallet: IWalletAddress) => dispatch(removeWallet(wallet));

  // ======================================================================================================
  // handlers
  // ======================================================================================================

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(address);
    toast({
      render: () => <ToastElement />,
    });
  };

  const handleAddressClick = () => {
    if (isPreventSwitchWallet) return;
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

  const handleRemoveWallet = async () => {
    _removeWallet({ name: "", address, walletProvider: selectedWalletProvider });

    const db = EXTERNAL_WALLET_DB();

    if (selectedWalletProvider && selectedWalletProvider !== "myrkle") {
      await db.removeWallet({ address, walletProvider: selectedWalletProvider });
    }

    onCloseRemoveWallet();
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
              cursor={isPreventSwitchWallet ? "not-allowed" : "pointer"}
              onClick={handleAddressClick}
              maxW="calc(100% - 80px)"
            >
              {address}
            </Text>
          )}
          <Spacer />
          <Box bg="darkest" p="0 5px" borderRadius="4px" onClick={handleCopyAddress}>
            <CopyIcon fill="none" fontSize="sm" cursor="pointer" />
          </Box>
          <CloseButton bg="darkest" size="sm" onClick={onOpenRemoveWallet} />
        </HStack>

        {name && (
          <Text fontSize="xs" color="textDark">
            {address}
          </Text>
        )}
      </Box>

      <Backdrop isOpen={isOpen}>
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
      </Backdrop>

      <Backdrop isOpen={isRemoveWalletOpen}>
        <DialogBox handleClose={onCloseRemoveWallet}>
          <Text fontSize="sm" fontWeight="bold">
            Are you sure you want to remove this wallet?
          </Text>
          <Flex mt={16} justify="flex-end">
            <Button h="35px" mr={3} onClick={handleRemoveWallet}>
              Proceed
            </Button>
            <Button h="35px" bg="secondary" onClick={onCloseRemoveWallet}>
              Cancel
            </Button>
          </Flex>
        </DialogBox>
      </Backdrop>
    </>
  );
}

export default AddressItem;
