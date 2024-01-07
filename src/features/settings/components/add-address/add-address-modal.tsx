import { useRef, useState } from "react";
import { MotionBox } from "@/components/motion-elements";
import { Box, Text, useOutsideClick } from "@chakra-ui/react";
import Input from "@/components/input";
import Button from "@/components/button";
import { useAddressBookMutation } from "@/features/shared/redux/xrp.api";
import { selectUserId } from "@/features/auth/redux/auth.selectors";
import { useSelector } from "react-redux";

export interface AddAddressModalProps {
  handleClose: () => void;
}

function AddAddressModal({ handleClose }: AddAddressModalProps) {
  const userId = useSelector(selectUserId);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const isSubmitDisabled = !name.trim().length || !address.trim().length;

  const ref = useRef(null);

  const [addToAddressBook, { isLoading }] = useAddressBookMutation();

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  const resetData = () => {
    setName("");
    setAddress("");
    handleClose();
  };

  const handleSubmit = () => {
    if (userId === null) return;

    addToAddressBook({
      name,
      address,
      user: userId,
    })
      .unwrap()
      .then(() => resetData())
      .catch(() => resetData());
  };

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      w="300px"
      h="250px"
      p={4}
      bg="darker"
      borderRadius="30px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Box px={4} mt={3}>
        <Text fontWeight="bold" mb={4}>
          Add address
        </Text>
        <Input
          mb={3}
          placeholder="Name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <Input
          mb={3}
          placeholder="Address"
          value={address}
          onChange={(e: any) => setAddress(e.target.value)}
        />
        <Button
          w="100%"
          bg={isSubmitDisabled ? "secondary" : "primary"}
          isDisabled={isSubmitDisabled}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          confirm
        </Button>
      </Box>
    </MotionBox>
  );
}

export default AddAddressModal;
