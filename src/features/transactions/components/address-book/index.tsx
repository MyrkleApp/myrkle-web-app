import Backdrop from "@/components/backdrop";
import AddressBookIcon from "@/icons/address-book";
import { HStack, Square, Text, useDisclosure } from "@chakra-ui/react";
import AddressBookModal from "./address-book-modal";

export interface AddressBookProps {
  handleAddress: (address: string) => void;
}

function AddressBook({ handleAddress }: AddressBookProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack onClick={onOpen} cursor="pointer">
        <Square bg="secondary" size="50px" borderRadius="10px">
          <AddressBookIcon fontSize="2xl" />
        </Square>
        <Text color="textDark" fontSize="sm" fontWeight="bold">
          Address Book
        </Text>
      </HStack>

      <Backdrop isOpen={isOpen}>
        <AddressBookModal handleClose={onClose} handleAddress={handleAddress} />
      </Backdrop>
    </>
  );
}

export default AddressBook;
