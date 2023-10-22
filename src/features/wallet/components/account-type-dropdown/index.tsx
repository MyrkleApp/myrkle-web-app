import { Box, Button, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import DropdownItem from "./dropdown-item";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "@/components/motion-elements";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";
import { useSelector } from "react-redux";
import { selectAddress } from "../../redux/wallet.selectors";
import { ellipsisAtCenter } from "@/helpers";
import { useLocalStorage } from "react-use";

function AccountTypeDropdown() {
  const [, , clearSignInData] = useLocalStorage("sign-in-data");

  const address = useSelector(selectAddress);

  const { isOpen, onToggle, onClose } = useDisclosure();
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: onClose,
  });

  const handleDisconnect = (e: any) => {
    e.stopPropagation();
    clearSignInData();
    document.location.reload();
  };

  return (
    <Box>
      <Button
        ref={ref}
        w="130px"
        h="27px"
        bg="dark"
        color="textDark"
        fontSize="2xs"
        borderRadius="30px"
        boxShadow="0 2px 2px #000"
        textAlign="left"
        justifyContent="space-between"
        rightIcon={
          address ? (
            <Box
              h="10px"
              w="10px"
              borderRadius="50%"
              bg="#ff0000"
              _hover={{ w: "13px", h: "13px" }}
              onClick={handleDisconnect}
            />
          ) : (
            <ThickArrowDownIcon color="gray" fill="none" fontSize="2xs" />
          )
        }
        _hover={{ bg: "dark" }}
        onClick={onToggle}
      >
        {address ? (
          <Box letterSpacing={0.7} color="textDark">
            {ellipsisAtCenter(address)}
          </Box>
        ) : (
          "Switch account"
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            w="fit-content"
            pos="absolute"
            initial={{ top: 30 }}
            animate={{ top: 52 }}
            exit={{ top: 30, opacity: 0 }}
          >
            <DropdownItem>connect xumm</DropdownItem>
          </MotionBox>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            w="fit-content"
            pos="absolute"
            initial={{ top: 30 }}
            animate={{ top: 82 }}
            exit={{ top: 30, opacity: 0 }}
          >
            <DropdownItem>connect crossmark</DropdownItem>
          </MotionBox>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            w="fit-content"
            pos="absolute"
            initial={{ top: 30 }}
            animate={{ top: 112 }}
            exit={{ top: 30, opacity: 0 }}
          >
            <DropdownItem>connect GemWallet</DropdownItem>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default AccountTypeDropdown;
