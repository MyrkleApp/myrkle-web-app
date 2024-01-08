import Backdrop from "@/components/backdrop";
import ToastElement from "@/components/toast-element";
import ProceedModal from "@/features/shared/components/proceed-modal";
import { useDeleteAddressMutation } from "@/features/shared/redux/xrp.api";
import { ellipsisAtCenter } from "@/helpers";
import CopyIcon from "@/icons/copy";
import RemoveAccountIcon from "@/icons/remove-account";
import { Box, Flex, HStack, Text, useDisclosure, useToast } from "@chakra-ui/react";

export interface AddressBookItemProps {
  id: number;
  name: string;
  address: string;
}

function AddressBookItem({ id, name, address }: AddressBookItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();

  const toast = useToast({
    position: "top",
    containerStyle: {
      ml: "400px",
      width: "200px",
    },
  });

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(address);
    toast({
      render: () => <ToastElement />,
    });
  };

  const handleDeleteAddress = () => {
    deleteAddress(id)
      .unwrap()
      .then(() => {
        toast({
          render: () => (
            <ToastElement bg="success" w="250px" fontWeight="bold" fontSize="lg">
              Address deleted successfully
            </ToastElement>
          ),
        });
        onClose();
      })
      .catch(() => {
        toast({
          render: () => (
            <ToastElement bg="danger" w="250px" fontWeight="bold" fontSize="lg">
              Sorry, an error occurred!
            </ToastElement>
          ),
        });
        onClose();
      });
  };

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        bg="darker"
        h="55px"
        px="25px"
        mb={3}
        borderRadius="40px"
      >
        <Text fontSize="sm">{name}</Text>
        <Text fontSize="sm" color="textDark">
          {ellipsisAtCenter(address)}
        </Text>
        <HStack>
          <Box
            bg="darkest"
            p="0 5px"
            borderRadius="4px"
            cursor="pointer"
            onClick={handleCopyAddress}
          >
            <CopyIcon fill="none" fontSize="xs" />
          </Box>
          <Box bg="darkest" p="0 5px" borderRadius="4px" cursor="pointer" onClick={onOpen}>
            <RemoveAccountIcon fontSize="xs" />
          </Box>
        </HStack>
      </Flex>

      <Backdrop isOpen={isOpen}>
        <ProceedModal
          text={`You are about to delete ${name || "this address"} from your address book.`}
          isLoading={isLoading}
          handleProceed={handleDeleteAddress}
          handleClose={onClose}
          h="280px"
        />
      </Backdrop>
    </>
  );
}

export default AddressBookItem;
