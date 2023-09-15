import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import IconContainer from "../icon-container";
import NftIcon from "@/icons/nft";
import Backdrop from "@/components/backdrop";
import { AnimatePresence } from "framer-motion";
import BurnListModal from "./burn-list-modal";
import BurnItemModal from "./burn-item-modal";

function BurnNft() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalType, setModalType] = useState<"list" | "item">("list");

  const handleClose = () => {
    onClose();
  };

  const handleItemClick = () => {
    setModalType("item");
  };

  const handleBurnItemModalClose = () => {
    onClose();
    setModalType("list");
  };

  return (
    <>
      <IconContainer title="NFT" h="210px" handleClick={onOpen}>
        <NftIcon fill="none" fontSize="50px" />
      </IconContainer>

      <Backdrop isOpen={isOpen}>
        <AnimatePresence>
          {modalType === "list" && (
            <BurnListModal handleClose={handleClose} handleItemClick={handleItemClick} />
          )}

          {modalType === "item" && (
            <BurnItemModal
              handleClose={handleBurnItemModalClose}
              handleItemClick={handleItemClick}
            />
          )}
        </AnimatePresence>
      </Backdrop>
    </>
  );
}

export default BurnNft;
