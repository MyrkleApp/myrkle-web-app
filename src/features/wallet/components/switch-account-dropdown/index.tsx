import {
  Accordion,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import AccountItem from "./account-item";
import { useEffect, useRef, useState } from "react";
import Backdrop from "@/components/backdrop";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "@/components/motion-elements";
import { ISignIn, IWalletAddress, TWalletProvider } from "../../types";
import { selectAddress, selectMyWallets, selectWalletProvider } from "../../redux/wallet.selectors";
import { useDispatch, useSelector } from "react-redux";
import { providersList } from "./data";
import SwitchAccountModal from "./switch-account-modal";
import { setAddress, setWalletProvider } from "../../redux/wallet.slice";
import useExternalWalletEvent from "../../hooks/use-external-wallet-event";
import ConnectXummModal from "@/components/connect-xumm-modal";
import useXummSignIn from "@/features/auth/hooks/use-xumm-signin";
import { socket, xummSignInJson } from "@/features/shared/socket-io";
import { useLocalStorage } from "react-use";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";
import { ellipsisAtCenter } from "@/helpers";
import DialogBox from "@/components/dialog-box";
import DisconnectButton from "./disconnect-button";
import { checkForCrossmark } from "@/features/shared/connections/crossmark";
import useCrossmarkSignIn from "@/features/auth/hooks/use-crossmark-signin";
import useGemWalletSignIn from "@/features/auth/hooks/use-gemwallet-signin";
import { checkForGemWallet } from "@/features/shared/connections/gemwallet";
import EXTERNAL_WALLET_DB from "@/services/db/external-wallet-db";

function SwitchAccountDropdown() {
  const [crossmarkSignIn] = useCrossmarkSignIn();
  const [gemWalletSignIn] = useGemWalletSignIn();
  const [signInData, storeSignInData, clearSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  const { newExternalProvider, newAddress, isWalletInStorage, resetExternalProviderState } =
    useExternalWalletEvent();
  const { qrCodeImage, resetSignInQrCode } = useXummSignIn();

  // ======================================================================================================
  // selectors
  // ======================================================================================================

  const myWallets = useSelector(selectMyWallets);
  const walletProvider = useSelector(selectWalletProvider);
  const address = useSelector(selectAddress);

  // ======================================================================================================
  // dispatch
  // ======================================================================================================

  const dispatch = useDispatch();
  const _setAddress = (address: string) => dispatch(setAddress(address));
  const _setWalletProvider = (provider: TWalletProvider) => dispatch(setWalletProvider(provider));

  // ======================================================================================================
  // state & disclosure & ref
  // ======================================================================================================

  const {
    isOpen: isDropdownOpen,
    onToggle: onToggleDropdown,
    onClose: onCloseDropdown,
  } = useDisclosure();

  const {
    isOpen: isExternalProviderChangeOpen,
    onOpen: onOpenExternalChange,
    onClose: onCloseExternalChange,
  } = useDisclosure();

  const {
    isOpen: isConfirmDisconnectOpen,
    onOpen: onOpenConfirmDisconnect,
    onClose: onCloseConfirmDisconnect,
  } = useDisclosure();

  const [selectedWallet, setSelectedWallet] = useState<null | IWalletAddress>(null);
  const [newWallet, setNewWallet] = useState<null | TWalletProvider>(null);

  const ref = useRef(null);

  // ======================================================================================================
  // effects
  // ======================================================================================================

  useOutsideClick({
    ref,
    handler: onCloseDropdown,
  });

  useEffect(() => {
    if (!isDropdownOpen) {
      setSelectedWallet(null);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    // close other modal if open
    setSelectedWallet(null);
    onCloseDropdown();

    if (!newExternalProvider || !newAddress) return;
    onOpenExternalChange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newExternalProvider, newAddress]);

  useEffect(() => {
    if (newWallet) {
      onCloseDropdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newWallet]);

  // ======================================================================================================
  // handlers & other functions
  // ======================================================================================================

  const handleNewWallet = async (wallet: null | TWalletProvider) => {
    if (wallet === "myrkle") return;

    if (wallet === "xumm") {
      setNewWallet(wallet);
      socket.emit("signIn", xummSignInJson);
    }

    if (wallet === "crossmark") {
      if (checkForCrossmark() !== true) {
        setNewWallet(wallet);
      } else {
        crossmarkSignIn();
      }
    }

    if (wallet === "gemwallet") {
      const isGemWallet = await checkForGemWallet();
      if (isGemWallet !== true) {
        setNewWallet(wallet);
      } else {
        gemWalletSignIn();
      }
    }
  };

  const getProviderWallets = (provider: TWalletProvider) => {
    return myWallets.filter((wallet) => wallet.walletProvider === provider);
  };

  const handleSelectedWallet = (walletAddress: IWalletAddress) => {
    setSelectedWallet(walletAddress);
  };

  const handleSwitchWallet = () => {
    if (!selectedWallet) return;

    if (signInData !== undefined) {
      storeSignInData({
        ...signInData,
        address: selectedWallet.address,
        walletProvider: selectedWallet.walletProvider,
      });
    }

    _setAddress(selectedWallet.address);
    _setWalletProvider(selectedWallet.walletProvider);
  };

  const handleSwitchWallet2 = () => {
    if (!newExternalProvider || !newAddress) return;

    if (!isWalletInStorage) {
      // TODO: prompt them to connect the new wallet
      return;
    }

    _setAddress(newAddress);
    _setWalletProvider(newExternalProvider);
    onCloseExternalChange();
    resetExternalProviderState();
  };

  const handleConfirmDisconnect = (e: any) => {
    e.stopPropagation();
    onOpenConfirmDisconnect();
  };

  const handleDisconnect = async () => {
    const db = EXTERNAL_WALLET_DB();

    if (walletProvider && walletProvider !== "myrkle") {
      await db.removeWallet({ address, walletProvider });
    }

    clearSignInData();
    document.location.reload();
  };

  return (
    <>
      <Box ref={ref}>
        <Button
          w="190px"
          h="27px"
          bg="dark"
          color="textDark"
          fontSize="2xs"
          borderRadius="30px"
          boxShadow="0 2px 2px #000"
          textAlign="center"
          justifyContent="space-between"
          _hover={{ bg: "dark" }}
          onClick={onToggleDropdown}
          rightIcon={
            address ? (
              <DisconnectButton handleClick={handleConfirmDisconnect} />
            ) : (
              <ThickArrowDownIcon color="gray" fill="none" fontSize="2xs" />
            )
          }
        >
          {address ? ellipsisAtCenter(address) : "Switch Account"}
        </Button>

        {isDropdownOpen && (
          <AnimatePresence>
            <MotionBox
              pos="absolute"
              top="52px"
              right="168px"
              w="190px"
              zIndex={200}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Accordion allowToggle>
                {providersList.map((provider, i: number) => (
                  <AccountItem
                    key={i}
                    logo={provider.logo}
                    wallets={getProviderWallets(provider.name)}
                    isActiveProvider={walletProvider === provider.name}
                    handleSelectedWallet={handleSelectedWallet}
                    handleNewWallet={() => handleNewWallet(provider.name)}
                  />
                ))}
              </Accordion>
            </MotionBox>
          </AnimatePresence>
        )}
      </Box>

      <Backdrop isOpen={isDropdownOpen || !!selectedWallet}>
        {selectedWallet && (
          <SwitchAccountModal
            address={selectedWallet.address}
            provider={selectedWallet.walletProvider}
            handleClose={onCloseDropdown}
            handleProceed={handleSwitchWallet}
            isWalletInStorage={true}
          />
        )}
      </Backdrop>

      <Backdrop isOpen={isExternalProviderChangeOpen}>
        <SwitchAccountModal
          address={newAddress}
          provider={newExternalProvider}
          handleClose={onCloseExternalChange}
          handleProceed={handleSwitchWallet2}
          isWalletInStorage={isWalletInStorage}
        />
      </Backdrop>

      <Backdrop isOpen={!!newWallet}>
        {newWallet === "xumm" && (
          <ConnectXummModal
            qrCodeImage={qrCodeImage}
            handleClose={() => {
              setNewWallet(null);
              resetSignInQrCode();
            }}
          />
        )}

        {/* crossmark and gemwallet dialog boxes only show up if their extensions are not installed */}

        {newWallet === "crossmark" && (
          <DialogBox message="Please install crossmark" handleClose={() => setNewWallet(null)} />
        )}
      </Backdrop>

      <Backdrop isOpen={isConfirmDisconnectOpen}>
        <DialogBox handleClose={onCloseConfirmDisconnect}>
          <Text fontSize="sm" fontWeight="bold">
            Are you sure you want to disconnect your currently connected wallet?
          </Text>
          <Flex justify="flex-end" mt="60px">
            <Button h="30px" mr={2} bg="danger" color="#fff" onClick={handleDisconnect}>
              confirm
            </Button>
            <Button h="30px" onClick={onCloseConfirmDisconnect}>
              cancel
            </Button>
          </Flex>
        </DialogBox>
      </Backdrop>
    </>
  );
}

export default SwitchAccountDropdown;
