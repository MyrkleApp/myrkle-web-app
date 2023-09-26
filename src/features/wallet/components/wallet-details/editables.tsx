import EditableElement from "@/components/editable-element";
import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";

function Editables() {
  return (
    <Flex
      direction="column"
      justify="space-between"
      w="calc(100% - 40px)"
      h="calc(100% - 40px)"
      mt="20px"
      mx="auto"
    >
      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Transfer fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="60%">
          <EditableElement />
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Balance" fontWeight="400" />
        </Box>
        <Box w="60%">
          <HStack>
            <Image src={xrpLogo} alt="logo" h="20px" />
            <Text fontSize="sm">1.00</Text>
          </HStack>
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Object Type" fontWeight="400" />
        </Box>
        <Box w="60%">
          <HStack>
            <Image src={xrpLogo} alt="logo" h="20px" />
            <Text fontSize="sm">ACCOUNT</Text>
          </HStack>
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Sequence" fontWeight="400" mb={0} />
        </Box>
        <Box w="60%">
          <EditableElement />
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Email" fontWeight="400" mb={0} />
        </Box>
        <Box w="60%">
          <EditableElement />
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Domain" fontWeight="400" mb={0} />
        </Box>
        <Box w="60%">
          <EditableElement />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Editables;
