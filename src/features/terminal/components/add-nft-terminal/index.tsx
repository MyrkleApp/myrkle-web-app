import Backdrop from "@/components/backdrop";
import AddNftModal from "@/features/shared/components/add-nft-modal";
import { useDisclosure } from "@chakra-ui/react";
import IconContainer from "../icon-container";
import NftIcon from "@/icons/nft";

function AddNftTerminal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <IconContainer title="NFT" h="180px" handleClick={onOpen}>
        <NftIcon fill="none" fontSize="50px" />
      </IconContainer>

      <Backdrop isOpen={isOpen}>
        <AddNftModal handleClose={handleClose} />
      </Backdrop>
    </>
  );
}

export default AddNftTerminal;
