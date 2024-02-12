import { Box, Flex, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import xrpTestnetLogo from "@/assets/xrp-testnet-logo.png";
import ChecksIcon from "@/icons/checks";
import HourGlassIcon from "@/icons/hour-glass";
import AccountDetailButton from "../account-detail-button";
import ExchangeIcon from "@/icons/exchange";
import ArrowUpIcon from "@/icons/arrow-up";
import ArrowDownIcon from "@/icons/arrow-down";
import { MotionBox, MotionText } from "@/components/motion-elements";
import Backdrop from "@/components/backdrop";
import AddressModal from "./address-modal";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import XAddressFormModal from "./x-address-form-modal";
import InfoIcon from "@/icons/info";
import AccountInfoModal from "./account-info-modal";
import { TAccountInfoModal } from "../../types";
import EnterPasswordModal from "./enter-password-modal";
import SecretsModal from "./secrets-modal";
import RenderElement from "@/components/render-element";
import { useGetBalanceQuery } from "@/features/shared/redux/xrp.api";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAddress,
  selectNet,
  selectNetwork,
  selectTotalBalance,
} from "../../redux/wallet.selectors";
import { cleanupTokenBalance, formatNumber } from "@/helpers";
import ROUTES from "@/routes";
import { Link } from "react-router-dom";
import { setTotalBalance } from "../../redux/wallet.slice";
import { selectUserName } from "@/features/auth/redux/auth.selectors";

const actionLinks = [
  { text: "Check", icon: ChecksIcon, link: ROUTES.TERMINAL_CHECKS },
  { text: "Escrow", icon: HourGlassIcon, link: ROUTES.TERMINAL_ESCROWS },
  { text: "Send", icon: ArrowUpIcon, link: ROUTES.TRANSACTIONS },
  { text: "Receive", icon: ArrowDownIcon, link: "#" },
  { text: "Exchange", icon: ExchangeIcon, link: ROUTES.EXCHANGE },
];

const animateSize: string[] = [
  "130px",
  "160px",
  "140px",
  "140px",
  "190px",
  "190px",
  "190px",
  "130px",
];

function WalletDetails() {
  const {
    isOpen: isAddressModalOpen,
    onOpen: onAddressModalOpen,
    onClose: onAddressModalClose,
  } = useDisclosure();

  const [addressModal, setAddressModal] = useState<"address" | "x-address-form">("address");

  const {
    isOpen: isAccountInfoModalOpen,
    onOpen: onAccountInfoModalOpen,
    onClose: onAccountInfoModalClose,
  } = useDisclosure();

  const [accountInfoModal, setAccountInfoModal] = useState<TAccountInfoModal>("account-info");

  const dispatch = useDispatch();

  // =======================================================================================
  // selectors
  // =======================================================================================
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);
  const totalBalance = useSelector(selectTotalBalance);
  const network = useSelector(selectNetwork);
  const username = useSelector(selectUserName);

  // =======================================================================================
  // api
  // =======================================================================================

  const { isLoading: isBalanceLoading, isFetching: isBalanceFetching } = useGetBalanceQuery({
    address,
    net,
  });

  // =======================================================================================
  // handlers
  // =======================================================================================

  const handleAddressClick = () => {
    onAddressModalOpen();
  };

  const handleAddressModalClose = () => {
    onAddressModalClose();
    setAddressModal("address");
  };

  const handleXAddress = () => {
    setAddressModal("x-address-form");
  };

  const handleAccountInfoModalClose = () => {
    onAccountInfoModalClose();
    setAccountInfoModal("account-info");
  };

  const handleAccountInfoModal = (modal: TAccountInfoModal) => {
    setAccountInfoModal(modal);
  };

  // =======================================================================================
  // effects
  // =======================================================================================

  const tokenCardBalanceElems = document.querySelectorAll(".token-card-balance");

  /**
   * this is not exactly the best practise,
   * but it was what I had to do because I
   * could not get the token price on testnet.
   * this made it difficult to be able to calculate
   * the sum of the tokens on testnet
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const elems = Array.from(document.querySelectorAll(".token-card-balance"));
      if (elems.length) {
        const balanceArr: number[] = [];
        elems.forEach((elem) => {
          if (!isNaN(cleanupTokenBalance(elem.innerHTML))) {
            balanceArr.push(cleanupTokenBalance(elem.innerHTML));
          }
        });
        const sum = balanceArr.reduce((acc, val) => acc + val, 0);
        dispatch(setTotalBalance(formatNumber(sum)));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch, tokenCardBalanceElems]);

  return (
    <>
      <Flex
        h={["auto", null, null, "calc(46%)", "38%"]}
        bg="dark"
        borderRadius="25px"
        align="center"
      >
        <Box minW={["250px"]} h="200px" pos="relative">
          {network === "mainnet" && (
            <MotionBox
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              borderRadius="50%"
              bg="darkest"
              animate={{
                height: animateSize,
                width: animateSize,
              }}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore no problem in operation, although type error appears.
              transition={{
                duration: 0.9,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          )}

          <Image
            src={network === "mainnet" ? xrpLogo : xrpTestnetLogo}
            alt=""
            // h="140px"
            // w="140px"
            h={["80px", null, "120px", "140px"]}
            w={["80px", null, "120px", "140px"]}
            pos="absolute"
            top="calc(50% - 1px)"
            left="calc(50% - 1px)"
            transform="translate(-50%, -50%)"
          />
        </Box>

        <Flex ml={10} direction="column" justify="space-between" pt={"2%"} pb={"2.2%"} h="100%">
          <HStack spacing={1} cursor="pointer" onClick={handleAddressClick}>
            <Text color="textDark" fontSize="13px" fontWeight="bold">
              Welcome
            </Text>
            <RenderElement isLoading={false} h="20px">
              <Text color="textDark" fontSize="13px" fontWeight="bold" textTransform="capitalize">
                {username || "-- --"}
              </Text>
            </RenderElement>
          </HStack>

          <Box mt="-15px">
            <RenderElement
              isLoading={isBalanceLoading || isBalanceFetching}
              h="40px"
              w={["300px", null, null, "470px"]}
              mt={4}
              mb={2}
            >
              <Text
                className="font-face-proxima-nova-extrabld"
                color="#d5d6d4"
                fontSize={["9vh", null, null, null, null, "60px"]}
              >
                ${totalBalance}
              </Text>
            </RenderElement>
          </Box>

          <HStack spacing={3} pr={2} wrap="wrap">
            {actionLinks.map((actionLink, i) => (
              <Link key={i} to={actionLink.link}>
                <AccountDetailButton
                  text={actionLink.text}
                  icon={actionLink.icon}
                  handleClick={
                    actionLink.text.toLowerCase() === "receive" ? onAddressModalOpen : undefined
                  }
                />
              </Link>
            ))}
            <Box w="117px">
              <Box
                display="flex"
                alignItems="center"
                bg="secondary"
                borderRadius="50%"
                h="35px"
                w="35px"
                cursor="pointer"
                onClick={onAccountInfoModalOpen}
                transition="0.25s linear all"
                _hover={{
                  width: ["35px", null, null, null, "115px"],
                  borderRadius: "20px",
                  "& > .account-info-text": {
                    display: ["none", null, null, null, "block"],
                  },
                }}
              >
                <InfoIcon pos="absolute" ml="9px" />
                <AnimatePresence>
                  <MotionText
                    className="account-info-text"
                    display="none"
                    pos="absolute"
                    ml={9}
                    w="90px"
                    color="textDark"
                    fontSize="xs"
                    fontWeight={600}
                  >
                    account info
                  </MotionText>
                </AnimatePresence>
              </Box>
            </Box>
          </HStack>
        </Flex>
      </Flex>

      <Backdrop isOpen={isAddressModalOpen}>
        <AnimatePresence>
          {addressModal === "address" && (
            <AddressModal
              handleClose={handleAddressModalClose}
              address={address}
              handleXAddress={handleXAddress}
            />
          )}

          {addressModal === "x-address-form" && (
            <XAddressFormModal handleClose={handleAddressModalClose} />
          )}
        </AnimatePresence>
      </Backdrop>

      <Backdrop isOpen={isAccountInfoModalOpen}>
        {accountInfoModal === "account-info" && (
          <AccountInfoModal
            handleClose={handleAccountInfoModalClose}
            handleAccountInfoModal={handleAccountInfoModal}
          />
        )}

        {accountInfoModal === "enter-password" && (
          <EnterPasswordModal
            handleClose={() => setAccountInfoModal("account-info")}
            handleAccountInfoModal={handleAccountInfoModal}
          />
        )}

        {accountInfoModal === "secrets" && (
          <SecretsModal handleClose={() => setAccountInfoModal("enter-password")} />
        )}
      </Backdrop>
    </>
  );
}

export default WalletDetails;
