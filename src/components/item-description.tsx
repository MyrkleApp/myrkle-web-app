import { Box, Circle, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { MotionBox } from "./motion-elements";

export interface ItemDescriptionProps {
  description: string;
  [any: string]: any;
}

function ItemDescription({ description, ...props }: ItemDescriptionProps) {
  const { isOpen, onToggle } = useDisclosure();
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: () => isOpen && onToggle(),
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => onToggle(), 5000);
    }
  }, [isOpen, onToggle]);

  return (
    <Box pos="relative" display="inline">
      <Circle
        border="1px solid #fff"
        fontSize="8px"
        size="11px"
        fontWeight="bold"
        cursor="pointer"
        onClick={onToggle}
      >
        ?
      </Circle>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            pos="absolute"
            top="-20px"
            left="20px"
            fontSize="2xs"
            ml=""
            h="130px"
            w="180px"
            bg="darker"
            borderRadius="20px"
            boxShadow="0px 0px 5px #adacac"
            p={3}
            zIndex={100}
            {...props}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {description}
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default ItemDescription;
