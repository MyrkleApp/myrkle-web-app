import { MotionBox } from "@/components/motion-elements";
import { HStack, Image, Spacer, Text, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import DropdownItem from "./dropdown-item";

function AssetsDropdown() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: onClose,
  });

  const handleDropdownItemClick = () => {
    // onToggle();
    console.log("dropdown item click");
  };

  return (
    <>
      <HStack
        ref={ref}
        h="100%"
        w="130px"
        px={2}
        pos="absolute"
        top="0"
        bg="#4F4F4F"
        cursor="pointer"
        zIndex={2}
        borderRadius={isOpen ? "5px 5px 0 0" : "5px"}
        onClick={onToggle}
      >
        <Image src={xrpLogo} alt="logo" h="20px" />
        <Text fontWeight="bold" fontSize="xs" textTransform="uppercase">
          xrp
        </Text>

        <Spacer />

        <ThickArrowDownIcon fontSize="2xs" color="#b4b4b4" />
      </HStack>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            px={2}
            pt={1}
            w="130px"
            bg="#4F4F4F"
            borderRadius={isOpen ? "0 0 5px 5px" : "5px"}
            pos="absolute"
            top="100%"
            cursor="pointer"
            overflow="hidden"
            zIndex={1}
            initial={{ height: 0 }}
            animate={{ height: "115px" }}
            exit={{ height: 0 }}
          >
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <DropdownItem
                  key={i}
                  name="xrp"
                  icon={xrpLogo}
                  handleClick={() => handleDropdownItemClick()}
                />
              ))}
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}

export default AssetsDropdown;
