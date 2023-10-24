import { createPortal } from "react-dom";
import Backdrop from "./backdrop";
import { Spinner, VStack } from "@chakra-ui/react";
import LogoIcon from "@/icons/logo";

export interface BackdropLoader {
  isOpen: boolean;
}

function BackdropLoader({ isOpen }: BackdropLoader) {
  return (
    <>
      {createPortal(
        <Backdrop isOpen={isOpen}>
          <VStack pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
            <Spinner />
            <LogoIcon fontSize="120px" mt={-10} />
          </VStack>
        </Backdrop>,
        document.body,
      )}
    </>
  );
}

export default BackdropLoader;
