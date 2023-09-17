import Button from "@/components/button";
import { Box, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import DropdownItem from "./dropdown-item";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "@/components/motion-elements";

function AccountTypeDropdown() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: onClose,
  });

  return (
    <Box>
      <Button
        ref={ref} // you are using the ref of a custom component when it is not exposed.
        w="130px"
        h="27px"
        bg="dark"
        fontSize="2xs"
        borderRadius="30px"
        boxShadow="0 2px 2px #000"
        textAlign="left"
        justifyContent="space-between"
        _hover={{ bg: "dark" }}
        onClick={onToggle}
      >
        Switch account
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

      {/* <DropdownItem>Switch account</DropdownItem> */}
    </Box>
  );
}

export default AccountTypeDropdown;
