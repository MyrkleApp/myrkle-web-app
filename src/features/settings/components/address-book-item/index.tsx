import CopyIcon from "@/icons/copy";
import RemoveAccountIcon from "@/icons/remove-account";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";

function AddressBookItem() {
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
      <Text fontSize="sm">Bukkas kills</Text>
      <Text fontSize="sm" color="textDark">
        JDFWIDBWBSDFBOFBNBKLJNDFDUFBNEIBUENBJVG
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
