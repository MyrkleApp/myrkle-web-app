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

function SwitchAccountDropdown() {
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

  const { isOpen, onToggle, onClose } = useDisclosure();

  const [selectedWallet, setSelectedWallet] = useState<null | IWalletAddress>(null);

  const ref = useRef(null);

  // ======================================================================================================
  // effects
  // ======================================================================================================

  useOutsideClick({
    ref,
    handler: onClose,
  });

  useEffect(() => {
    if (!isOpen) {
      setSelectedWallet(null);
    }
  }, [isOpen]);

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
          onClick={onToggle}
        >
          Switch Account
        </Button>

        {isOpen && (
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

      <Backdrop isOpen={isOpen || !!selectedWallet}>
        {selectedWallet && selectedWallet.walletProvider !== "xumm" && (
          <SwitchAccountModal
            address={selectedWallet.address}
            provider={selectedWallet.walletProvider}
            handleClose={onClose}
            handleProceed={handleSwitchWallet}
          />
        )}
      </Backdrop>
    </>
  );
}

export default SwitchAccountDropdown;
