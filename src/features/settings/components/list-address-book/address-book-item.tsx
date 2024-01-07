import CopyIcon from "@/icons/copy";
import RemoveAccountIcon from "@/icons/remove-account";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";

export interface AddressBookItemProps {
  name: string;
  address: string;
}

function AddressBookItem({ name, address }: AddressBookItemProps) {
  return (
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
        {address}
      </Text>
      <HStack>
        <Box bg="darkest" p="0 5px" borderRadius="4px">
          <CopyIcon fill="none" fontSize="xs" />
        </Box>
        <Box bg="darkest" p="0 5px" borderRadius="4px">
          <RemoveAccountIcon fontSize="xs" />
        </Box>
      </HStack>
    </Flex>
  );
}

export default AddressBookItem;
