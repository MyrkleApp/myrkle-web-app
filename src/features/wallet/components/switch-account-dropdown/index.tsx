import { Accordion, Box, Button, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import AccountItem from "./account-item";
import { useEffect, useRef, useState } from "react";
import Backdrop from "@/components/backdrop";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "@/components/motion-elements";
import { IWalletAddress, TWalletProvider } from "../../types";
import { selectMyWallets, selectWalletProvider } from "../../redux/wallet.selectors";
import { useDispatch, useSelector } from "react-redux";
import { providersList } from "./data";
import SwitchAccountModal from "./switch-account-modal";
import { setAddress, setWalletProvider } from "../../redux/wallet.slice";
import useExternalWalletEvent from "../../hooks/use-external-wallet-event";

function SwitchAccountDropdown() {
  const { newExternalProvider, newAddress, isWalletInStorage } = useExternalWalletEvent();

  // ======================================================================================================
  // selectors
  // ======================================================================================================

  const myWallets = useSelector(selectMyWallets);
  const walletProvider = useSelector(selectWalletProvider);

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

  const [selectedWallet, setSelectedWallet] = useState<null | IWalletAddress>(null);

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

  // ======================================================================================================
  // handlers & other functions
  // ======================================================================================================

  const getProviderWallets = (provider: TWalletProvider) => {
    return myWallets.filter((wallet) => wallet.walletProvider === provider);
  };

  const handleSelectedWallet = (walletAddress: IWalletAddress) => {
    setSelectedWallet(walletAddress);
  };

  const handleSwitchWallet = () => {
    if (!selectedWallet) return;

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
          textAlign="left"
          justifyContent="space-between"
          _hover={{ bg: "dark" }}
          onClick={onToggleDropdown}
        >
          Switch Account
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
                  />
                ))}
              </Accordion>
            </MotionBox>
          </AnimatePresence>
        )}
      </Box>

      <Backdrop isOpen={isDropdownOpen || !!selectedWallet}>
        {selectedWallet && selectedWallet.walletProvider !== "xumm" && (
          <SwitchAccountModal
            address={selectedWallet.address}
            provider={selectedWallet.walletProvider}
            handleClose={onCloseDropdown}
            handleProceed={handleSwitchWallet}
            isWalletInStorage={isWalletInStorage}
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
    </>
  );
}

export default SwitchAccountDropdown;
