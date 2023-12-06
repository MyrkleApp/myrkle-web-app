import Backdrop from "@/components/backdrop";
import AddNftModal from "@/features/shared/components/add-nft-modal";
import PlusIcon from "@/icons/plus";
import { Circle, HStack, Text, useDisclosure } from "@chakra-ui/react";

function AddNft() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <HStack cursor="pointer" onClick={onOpen}>
        <Text fontSize="xs">Receive NFT</Text>
        <Circle bg="textDark" size="17px" cursor="pointer">
          <PlusIcon fontSize="xs" />
        </Circle>
      </HStack>

      <Backdrop isOpen={isOpen}>
        <AddNftModal handleClose={handleClose} />
      </Backdrop>
    </>
  );
}

export default AddNft;
