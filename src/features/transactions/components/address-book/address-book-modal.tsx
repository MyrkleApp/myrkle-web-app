import Button from "@/components/button";
import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
import { Box, CloseButton, HStack, Spacer, useOutsideClick } from "@chakra-ui/react";
import { useRef, useState } from "react";
import AddressItem from "./address-item";

export interface AddressBookModalProps {
  handleClose: () => void;
  handleAddress: (address: string) => void;
}

function AddressBookModal({ handleClose, handleAddress }: AddressBookModalProps) {
  const ref = useRef(null);
  const [preSelectedAddress, setPreSelectedAddress] = useState(-1);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  const handleConfirmClick = () => {
    handleAddress("bdhskdjvdlkdnownelekwnfewlfsfnslkfneslneslvne");
    handleClose();
  };

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="450px"
      w="350px"
      px={7}
      py={5}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <HStack>
        <ItemLabel title="Select address" fontSize="sm" />
        <Spacer />
        <CloseButton onClick={handleClose} />
      </HStack>

      <Box pr={1} mb={4} mt={3} h="calc(100% - 110px)" overflow="hidden auto">
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <AddressItem
              key={i}
              name="address name"
              address="bdhskdjvdlkdnownelekwnfewlfsfnslkfneslneslvne"
              isActive={i === preSelectedAddress}
              handleClick={() => setPreSelectedAddress(i)}
            />
          ))}
      </Box>
      <Button w="100%" isDisabled={preSelectedAddress < 0} onClick={handleConfirmClick}>
        confirm
      </Button>
    </MotionBox>
  );
}

export default AddressBookModal;
