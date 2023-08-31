import Backdrop from "@/components/backdrop";
import PlusIcon from "@/icons/plus";
import { Circle, HStack, Text, useDisclosure } from "@chakra-ui/react";
import AddNftModal from "./add-nft-modal";

function AddNft() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <HStack cursor="pointer" onClick={onOpen}>
        <Text fontSize="2xs">Receive NFT</Text>
        <Circle bg="textDark" size="17px" cursor="pointer">
          <PlusIcon fontSize="2xs" />
        </Circle>
      </HStack>

      <Backdrop isOpen={isOpen}>
        <AddNftModal handleClose={handleClose} />
      </Backdrop>
    </>
  );
}

export default AddNft;
