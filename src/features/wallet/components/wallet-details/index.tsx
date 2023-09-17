import { Box, Flex, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import ChecksIcon from "@/icons/checks";
import HourGlassIcon from "@/icons/hour-glass";
import AccountDetailButton from "../account-detail-button";
import ExchangeIcon from "@/icons/exchange";
import ArrowUpIcon from "@/icons/arrow-up";
import ArrowDownIcon from "@/icons/arrow-down";
import { MotionBox, MotionText } from "@/components/motion-elements";
import Backdrop from "@/components/backdrop";
import AddressModal from "./address-modal";
import qrCodeImage from "@/assets/qr-code.png";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import XAddressFormModal from "./x-address-form-modal";
import InfoIcon from "@/icons/info";
import AccountInfoModal from "./account-info-modal";

const actionLinks = [
  { text: "Check", icon: ChecksIcon },
  { text: "Escrow", icon: HourGlassIcon },
  { text: "Send", icon: ArrowUpIcon },
  { text: "Receive", icon: ArrowDownIcon },
  { text: "Exchange", icon: ExchangeIcon },
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
  };

  return (
    <>
      <Flex h="38%" bg="dark" borderRadius="25px" align="center">
        <Box width="250px" h="200px" pos="relative">
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

          <Image
            src={xrpLogo}
            alt=""
            h="140px"
            w="140px"
            pos="absolute"
            top="calc(50% - 1px)"
            left="calc(50% - 1px)"
            transform="translate(-50%, -50%)"
          />
        </Box>

        <Flex direction="column" justify="space-between" pt={"2%"} pb={"2.2%"} h="100%">
          <HStack spacing={5} cursor="pointer" onClick={handleAddressClick}>
            <Text color="textDark" fontSize="xs" fontWeight="bold">
              Welcome
            </Text>
            <Text color="textDark" fontSize="xs" fontWeight="bold">
              AHFBUSKEBVDUSVBKFJWEFWBUG,DV746234H4UIERHOOF
            </Text>
          </HStack>

          <Box mt="-20px">
            <Text className="font-face-proxima-nova-extrabld" color="#d5d6d4" fontSize={"7vh"}>
              5,234.9
            </Text>
            <Text color="textDark" fontSize="xs" fontWeight="bold" mt={-2}>
              $600,043.89
            </Text>
          </Box>

          <HStack spacing={3}>
            {actionLinks.map((actionLink, i) => (
              <AccountDetailButton key={i} text={actionLink.text} icon={actionLink.icon} />
            ))}
            <Box
              display="flex"
              alignItems="center"
              bg="secondary"
              borderRadius="50%"
              h="35px"
              w="35px"
              cursor="pointer"
              onClick={onAccountInfoModalOpen}
              transition="0.1s linear all"
              _hover={{
                width: "115px",
                borderRadius: "20px",
                "& > .account-info-text": {
                  display: "block",
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
                  w="70px"
                  color="textDark"
                  fontSize="xs"
                  fontWeight={600}
                >
                  account info
                </MotionText>
              </AnimatePresence>
            </Box>
          </HStack>
        </Flex>
      </Flex>

      <Backdrop isOpen={isAddressModalOpen}>
        <AnimatePresence>
          {addressModal === "address" && (
            <AddressModal
              handleClose={handleAddressModalClose}
              qrCodeImage={qrCodeImage}
              address={`AHFBUSKEBVDUSVBKFJWEFWBUG,DV746234H4UIERHOOF`}
              handleXAddress={handleXAddress}
            />
          )}

          {addressModal === "x-address-form" && (
            <XAddressFormModal handleClose={handleAddressModalClose} />
          )}
        </AnimatePresence>
      </Backdrop>

      <Backdrop isOpen={isAccountInfoModalOpen}>
        <AccountInfoModal handleClose={handleAccountInfoModalClose} />
      </Backdrop>
    </>
  );
}

export default WalletDetails;
