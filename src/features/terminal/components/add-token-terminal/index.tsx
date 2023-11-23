import Backdrop from "@/components/backdrop";
import { useDisclosure } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import AddTokenFormModal from "@/features/shared/components/add-token-form-modal";
import SelectTokenModal from "@/features/shared/components/select-token-modal";
import { TAddTokenModalType } from "@/features/wallet/types";
import IconContainer from "../icon-container";
import TokenListIcon from "@/icons/token-list";

function AddTokenTerminal() {
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
      <IconContainer title="Token" h="210px" handleClick={onBackdropOpen}>
        <TokenListIcon fill="none" fontSize="50px" color="#4E4E4E" />
      </IconContainer>

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

export default AddTokenTerminal;
