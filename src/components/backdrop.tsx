import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "./motion-elements";
import { createPortal } from "react-dom";

export interface BackdropProps {
  isOpen: boolean;
  zIndex?: number;
  children?: React.ReactNode;
  handleClick?: (event: any) => void;
  isFullscreen?: boolean;
  [anyProp: string]: any;
}

function Backdrop({
  isOpen,
  zIndex,
  children,
  handleClick,
  isFullscreen,
  ...props
}: BackdropProps) {
  if (isFullscreen) {
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

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <Flex justify="center" align="center" h="100vh" w="100vw" top={0} left={0} pos="fixed">
              <Box h="100vh" w="100vw" overflow="hidden" maxH="900px" maxW="1800px" pos="relative">
                <MotionBox
                  pos="absolute"
                  top="70px"
                  right="0"
                  borderRadius="20px"
                  w={["calc(100% - 100px)", null, null, null, "calc(100% - 250px)"]}
                  h="calc(100% - 100px)"
                  bg="#00000092"
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
              </Box>
            </Flex>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default Backdrop;
