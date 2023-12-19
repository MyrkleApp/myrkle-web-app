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
import {
  selectAddress,
  selectMyWallets,
  selectNetwork,
  selectUserToken,
  selectWalletProvider,
} from "../../redux/wallet.selectors";
import { useDispatch, useSelector } from "react-redux";
import { providersList } from "./data";
import { setAddress, setWalletProvider } from "../../redux/wallet.slice";
// import useExternalWalletEvent from "../../hooks/use-external-wallet-event";
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
import ItemDescription from "@/components/item-description";

function SwitchAccountDropdown() {
  const [crossmarkSignIn] = useCrossmarkSignIn();
  const [gemWalletSignIn] = useGemWalletSignIn();
  const [signInData, storeSignInData, clearSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  // const { newExternalProvider, newAddress, isWalletInStorage, resetExternalProviderState } =
  //   useExternalWalletEvent();

  // ======================================================================================================
  // selectors
  // ======================================================================================================

  const myWallets = useSelector(selectMyWallets);
  const walletProvider = useSelector(selectWalletProvider);
  const address = useSelector(selectAddress);
  const userToken = useSelector(selectUserToken);
  const network = useSelector(selectNetwork);

  // ======================================================================================================
  // dispatch
  // ======================================================================================================

  const dispatch = useDispatch();
  const _setAddress = (address: string) => dispatch(setAddress(address));
  const _setWalletProvider = (provider: TWalletProvider) => dispatch(setWalletProvider(provider));

  // ======================================================================================================
  // state & disclosure & ref & xumm signin
  // ======================================================================================================

  const {
    isOpen: isDropdownOpen,
    onToggle: onToggleDropdown,
    onClose: onCloseDropdown,
  } = useDisclosure();

  // const {
  //   isOpen: isExternalProviderChangeOpen,
  //   onOpen: onOpenExternalChange,
  //   onClose: onCloseExternalChange,
  // } = useDisclosure();

  const {
    isOpen: isConfirmDisconnectOpen,
    onOpen: onOpenConfirmDisconnect,
    onClose: onCloseConfirmDisconnect,
  } = useDisclosure();

  const {
    isOpen: isWalletExistsOpen,
    onOpen: onOpenWalletExistsModal,
    onClose: onCloseWalletExistsModal,
  } = useDisclosure();

  const [selectedWallet, setSelectedWallet] = useState<null | IWalletAddress>(null);
  const [newWallet, setNewWallet] = useState<null | TWalletProvider>(null);

  const ref = useRef(null);

  const { qrCodeImage, resetSignInQrCode, isXummWalletExists } = useXummSignIn(() =>
    setNewWallet(null),
  );

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

  // useEffect(() => {
  //   // close other modal if open
  //   setSelectedWallet(null);
  //   onCloseDropdown();

  //   if (!newExternalProvider || !newAddress) return;
  //   onOpenExternalChange();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [newExternalProvider, newAddress]);

  useEffect(() => {
    if (newWallet) {
      onCloseDropdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newWallet]);

  useEffect(() => {
    if (isXummWalletExists) {
      onOpenWalletExistsModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isXummWalletExists]);

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
        const res = await crossmarkSignIn();
        if (res?.isWalletExists) {
          onOpenWalletExistsModal();
        }
      }
    }

    if (wallet === "gemwallet") {
      const isGemWallet = await checkForGemWallet();
      if (isGemWallet !== true) {
        setNewWallet(wallet);
      } else {
        const res = await gemWalletSignIn();
        if (res?.isWalletExists) {
          onOpenWalletExistsModal();
        }
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
        userToken,
        network,
        address: selectedWallet.address,
        walletProvider: selectedWallet.walletProvider,
      });
    }

    _setAddress(selectedWallet.address);
    _setWalletProvider(selectedWallet.walletProvider);
  };

  // const handleSwitchWallet2 = () => {
  //   if (!newExternalProvider || !newAddress) return;

  //   if (!isWalletInStorage) {
  //     // TODO: prompt them to connect the new wallet
  //     return;
  //   }

  //   _setAddress(newAddress);
  //   _setWalletProvider(newExternalProvider);
  //   onCloseExternalChange();
  //   resetExternalProviderState();
  // };

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
      <ItemDescription
        description="Switching wallets within the app doesn't impact your wallet state on Crossmark and GemWallet. To ensure smooth transactions, use your active wallet (as displayed on Crossmark and GemWallet) when making payments."
        top={7}
        left={-150}
        w="210px"
        h="130px"
      />
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
          <DialogBox handleClose={onCloseDropdown} borderRadius="25px" h="250px">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="primary"
              className="font-face-proxima-nova-extrabld"
            >
              Confirm?
            </Text>
            <Text fontSize="xs" fontWeight="bold">
              Would you like to switch your active wallet to {selectedWallet.address} which is
              currently available in your {selectedWallet.walletProvider} wallet?
            </Text>
            <Flex justify="space-between" mt="30px">
              <Button
                h="30px"
                bg="none"
                fontSize="sm"
                color="#fff"
                _hover={{ bg: "none " }}
                onClick={onCloseDropdown}
              >
                go back
              </Button>
              <Button
                h="30px"
                fontSize="sm"
                mr={2}
                bg="success"
                color="#fff"
                onClick={handleSwitchWallet}
              >
                confirm
              </Button>
            </Flex>
          </DialogBox>
        )}
      </Backdrop>

      {/* <Backdrop isOpen={isExternalProviderChangeOpen}>
        <DialogBox handleClose={onCloseExternalChange} borderRadius="25px" h="220px">
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="primary"
            className="font-face-proxima-nova-extrabld"
          >
            Confirm?
          </Text>
          <Text fontSize="xs" fontWeight="bold">
            Do you want to switch your active wallet to {newAddress} that exists on your{" "}
            {newExternalProvider} wallet?
          </Text>
          <Flex justify="space-between" mt="30px">
            <Button
              h="30px"
              bg="none"
              fontSize="sm"
              color="#fff"
              _hover={{ bg: "none " }}
              onClick={onCloseExternalChange}
            >
              go back
            </Button>
            <Button
              h="30px"
              fontSize="sm"
              mr={2}
              bg="success"
              color="#fff"
              onClick={handleSwitchWallet2}
            >
              confirm
            </Button>
          </Flex>
        </DialogBox>
      </Backdrop> */}

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
        <DialogBox h="220px" handleClose={onCloseConfirmDisconnect}>
          <Text fontSize="sm" fontWeight="bold">
            This will disconnect your current wallet. Are you sure you want to proceed?
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

      <Backdrop isOpen={isWalletExistsOpen}>
        <DialogBox
          h="220px"
          message="This wallet is already connected to myrkle."
          handleClose={onCloseWalletExistsModal}
        />
      </Backdrop>
    </>
  );
}

export default SwitchAccountDropdown;
