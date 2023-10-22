import CopyIcon from "@/icons/copy";
import { Box, HStack, Spacer, CloseButton, Text } from "@chakra-ui/react";

export interface AddressItemProps {
  name?: string;
  address: string;
}

function AddressItem({ name, address }: AddressItemProps) {
  return (
    <Box w="calc(100% - 70px)" mx="auto" mb={2}>
      <HStack mb={2}>
        {name ? (
          <Text fontSize="xs" fontWeight="bold">
            {name}
          </Text>
        ) : (
          <Text fontSize="xs" color="textDark">
            {address}
          </Text>
        )}
        <Spacer />
        <Box bg="darkest" p="0 5px" borderRadius="4px">
          <CopyIcon fill="none" fontSize="sm" cursor="pointer" />
        </Box>
        <CloseButton bg="darkest" size="sm" />
      </HStack>

      {name && (
        <Text fontSize="xs" color="textDark">
          {address}
        </Text>
      )}
    </Box>
  );
}

export default AddressItem;
