import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import IconContainer from "../icon-container";
import NftIcon from "@/icons/nft";
import Backdrop from "@/components/backdrop";
import { AnimatePresence } from "framer-motion";
import BurnListModal from "./burn-list-modal";
import BurnItemModal from "./burn-item-modal";
import ProceedModal from "@/features/shared/components/proceed-modal";
import { useBurnNftMutation } from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";

function BurnNft() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useSelector(selectAddress);

  const [modalType, setModalType] = useState<"list" | "item" | "proceed">("list");
  const [selectedNft, setSelectedNft] = useState<any>(null);

  const [burnNft, { isLoading }] = useBurnNftMutation();

  const handleClose = () => {
    onClose();
  };

  const handleItemClick = (nft: any) => {
    setModalType("item");
    setSelectedNft(nft);
  };

  const handleBurnItemModalClose = () => {
    onClose();
    setModalType("list");
  };

  const handleConfirmBurnClick = () => {
    setModalType("proceed");
  };

  const handleProceed = () => {
    burnNft({
      sender_addr: address,
      nftoken_id: selectedNft?.id,
      holder: address,
    })
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
              selectedNft={selectedNft}
              handleClose={handleBurnItemModalClose}
              handleConfirmBurnClick={handleConfirmBurnClick}
            />
          )}

          {modalType === "proceed" && (
            <ProceedModal
              text="You are about to burn this NFT from your wallet"
              isLoading={isLoading}
              handleClose={handleClose}
              handleProceed={handleProceed}
            />
          )}
        </AnimatePresence>
      </Backdrop>
    </>
  );
}

export default BurnNft;
