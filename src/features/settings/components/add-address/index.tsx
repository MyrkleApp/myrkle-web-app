import Backdrop from "@/components/backdrop";
import Button from "@/components/button";
import { useDisclosure } from "@chakra-ui/react";
import AddAddressModal from "./add-address-modal";

function AddAddress() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button h="30px" w="130px" onClick={onOpen}>
        add address
      </Button>
      <Backdrop isOpen={isOpen}>
        <AddAddressModal handleClose={onClose} />
      </Backdrop>
    </>
  );
}

export default AddAddress;
