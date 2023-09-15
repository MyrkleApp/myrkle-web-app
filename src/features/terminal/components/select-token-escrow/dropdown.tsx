import { MotionBox, MotionText } from "@/components/motion-elements";
import { HStack, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import TokenItem from "./token-item";

export interface DropdownProps {
  handleTokenClick: () => void;
}

function Dropdown({ handleTokenClick }: DropdownProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <MotionBox
      h="60px"
      bg="secondary"
      borderRadius="15px"
      cursor="pointer"
      onClick={onToggle}
      animate={{ height: isOpen ? "auto" : 60 }}
      exit={{ opacity: 0 }}
    >
      <HStack h="60px">
        <MotionText fontSize="xs" px={8} animate={{ fontSize: isOpen ? "9px" : "12px" }}>
          Select Token
        </MotionText>
      </HStack>
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            px={2}
            pb={8}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <TokenItem key={i} handleClick={handleTokenClick} />
              ))}
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionBox>
  );
}

export default Dropdown;
