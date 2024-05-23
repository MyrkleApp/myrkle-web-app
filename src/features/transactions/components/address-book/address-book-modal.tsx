import Button from "@/components/button";
import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
// import { selectUserToken } from "@/features/auth/redux/auth.selectors";
// import { useLazyGetAddressBookQuery } from "@/features/shared/redux/xrp.api";
import { Box, CloseButton, HStack, Spacer, useOutsideClick } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import RenderAddressBook from "./render-address-book";
import AddressItem from "./address-item";
import { selectAddressBookList } from "@/features/wallet/redux/wallet.selectors";

export interface AddressBookModalProps {
  handleClose: () => void;
  handleAddress: (address: string) => void;
}

function AddressBookModal({ handleClose, handleAddress }: AddressBookModalProps) {
  const ref = useRef(null);
  const [preSelectedAddress, setPreSelectedAddress] = useState("");

  // const userToken = useSelector(selectUserToken);
  const addressBookList = useSelector(selectAddressBookList);

  // const [getAddressBook, { data, isLoading, isFetching }] = useLazyGetAddressBookQuery();

  // useEffect(() => {
  //   if (userToken) {
  //     getAddressBook({}, true);
  //   }
  // }, [getAddressBook, userToken]);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  const handleConfirmClick = () => {
    handleAddress(preSelectedAddress);
    handleClose();
  };

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
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

      <Box
        pr={1}
        mb={4}
        mt={3}
        minH="200px"
        maxH={["calc(100vh - 270px)", null, null, null, null, "550px"]}
        overflow="hidden auto"
      >
        <RenderAddressBook isLoading={false} isEmpty={!addressBookList.length}>
          {addressBookList.map((item: any, index: number) => (
            <AddressItem
              key={index}
              name={item.name}
              address={item.address}
              isActive={item.address === preSelectedAddress}
              handleClick={() => setPreSelectedAddress(item.address)}
            />
          ))}
        </RenderAddressBook>
      </Box>
      <Button
        w="100%"
        bg={preSelectedAddress ? "primary" : "secondary"}
        isDisabled={!preSelectedAddress}
        onClick={handleConfirmClick}
      >
        confirm
      </Button>
    </MotionBox>
  );
}

export default AddressBookModal;
