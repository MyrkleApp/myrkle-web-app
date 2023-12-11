import React from "react";
import { Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "./motion-elements";
import { createPortal } from "react-dom";

export interface BackdropProps {
  isOpen: boolean;
  zIndex?: number;
  children?: React.ReactNode;
  handleClick?: (event: any) => void;
  [anyProp: string]: any;
}

function Backdrop({ isOpen, zIndex, children, handleClick, ...props }: BackdropProps) {
  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <MotionBox
              w={["calc(100vw - 100px)", null, null, null, "calc(100vw - 250px)"]}
              h="calc(100vh - 100px)"
              borderRadius="20px"
              bg="#00000092"
              pos="fixed"
              top="70px"
              right={0}
              zIndex={zIndex || 100}
              backdropFilter="blur(13px)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              {...props}
            >
              <Box width="100%" h="100%" pos="relative" onClick={handleClick}>
                {children}
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default Backdrop;
