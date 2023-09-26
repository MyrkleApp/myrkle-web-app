import EditableElement from "@/components/editable-element";
import ItemLabel from "@/components/item-label";
import { Box, Flex, Text } from "@chakra-ui/react";

function TokenEditables() {
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
        <Box w="30%">
          <ItemLabel title="Market cap" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <EditableElement />
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Transfer fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <EditableElement />
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Limit" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" letterSpacing={2} ml={5}>
            12345678
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Supply" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" ml={5}>
            10,000,000
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Sequence" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <EditableElement />
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Email" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <EditableElement />
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Domain" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <EditableElement />
        </Box>
      </Flex>
    </Flex>
  );
}

export default TokenEditables;
