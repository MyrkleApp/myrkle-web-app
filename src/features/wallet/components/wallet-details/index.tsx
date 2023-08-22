import { Box, Flex, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import ChecksIcon from "@/icons/checks";
import HourGlassIcon from "@/icons/hour-glass";
import AccountDetailButton from "../account-detail-button";
import ExchangeIcon from "@/icons/exchange";
import ArrowUpIcon from "@/icons/arrow-up";
import ArrowDownIcon from "@/icons/arrow-down";
import { MotionBox } from "@/components/motion-elements";
import Backdrop from "@/components/backdrop";
import AddressModal from "./address-modal";
import qrCodeImage from "@/assets/qr-code.png";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import XAddressFormModal from "./x-address-form-modal";

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

  const handleAddressClick = () => {
    onAddressModalOpen();
  };

  const handleModalClose = () => {
    onAddressModalClose();
    setAddressModal("address");
  };

  const handleXAddress = () => {
    setAddressModal("x-address-form");
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

        <Flex direction="column" justify="space-between" py={"2.2%"} h="100%">
          <HStack spacing={5} cursor="pointer" onClick={handleAddressClick}>
            <Text color="textDark" fontSize="md" fontWeight="bold">
              Welcome
            </Text>
            <Text color="textDark" fontSize="md" fontWeight="bold">
              AHFBUSKEBVDUSVBKFJWEFWBUG,DV746234H4UIERHOOF
            </Text>
          </HStack>

          <Box mt="-20px">
            <Text color="#d5d6d4" fontSize={["5xl", null, null, null, "55px"]} fontWeight="bold">
              5,234.9
            </Text>
            <Text color="textDark" fontSize="xs" fontWeight="bold" mt={-3}>
              $600,043.89
            </Text>
          </Box>

          <HStack spacing={3}>
            {actionLinks.map((actionLink, i) => (
              <AccountDetailButton key={i} text={actionLink.text} icon={actionLink.icon} />
            ))}
          </HStack>
        </Flex>
      </Flex>

      <Backdrop isOpen={isAddressModalOpen}>
        <AnimatePresence>
          {addressModal === "address" && (
            <AddressModal
              handleClose={handleModalClose}
              qrCodeImage={qrCodeImage}
              address={`AHFBUSKEBVDUSVBKFJWEFWBUG,DV746234H4UIERHOOF`}
              handleXAddress={handleXAddress}
            />
          )}

          {addressModal === "x-address-form" && (
            <XAddressFormModal handleClose={handleModalClose} />
          )}
        </AnimatePresence>
      </Backdrop>
    </>
  );
}

export default WalletDetails;
