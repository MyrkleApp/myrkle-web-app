import Backdrop from "@/components/backdrop";
import PlusIcon from "@/icons/plus";
import { Circle, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TAddTokenModalType } from "../../types";
import AddTokenFormModal from "@/features/shared/components/add-token-form-modal";
import SelectTokenModal from "@/features/shared/components/select-token-modal";

function AddToken() {
  const {
    isOpen: isBackdropOpen,
    onOpen: onBackdropOpen,
    onClose: onBackdropClose,
  } = useDisclosure();

  const [modalType, setModalType] = useState<TAddTokenModalType>("add-token-form");
  const [token, setToken] = useState(null);

  const handleBackdropClose = () => {
    onBackdropClose();
    setModalType("add-token-form");
    setToken(null);
  };

  const handleModalType = (modalType: TAddTokenModalType) => {
    setModalType(modalType);
  };

  const handleToken = (token: any) => {
    setToken(token);
    setModalType("add-token-form");
  };

  return (
    <>
      <HStack cursor="pointer" onClick={onBackdropOpen}>
        <Text fontSize="2xs">Add Token</Text>
        <Circle bg="textDark" size="17px" cursor="pointer">
          <PlusIcon fontSize="2xs" />
        </Circle>
      </HStack>

      <Backdrop isOpen={isBackdropOpen}>
        <AnimatePresence>
          {modalType === "add-token-form" && (
            <AddTokenFormModal
              handleClose={handleBackdropClose}
              handleTokenListIconClick={handleModalType}
              token={token}
            />
          )}

          {modalType === "select-token" && (
            <SelectTokenModal
              handleClose={handleBackdropClose}
              handleBackArrowClick={() => setModalType("add-token-form")}
              handleToken={handleToken}
            />
          )}
        </AnimatePresence>
      </Backdrop>
    </>
  );
}

export default AddToken;
