import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";

function ListTxnsEditables() {
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
        <Box w="35%">
          <ItemLabel title="Sequence" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">https://www.sally.com</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Date" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">13 / 02 / 2023</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Time" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">09:32 PM GMT</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <HStack>
            <Image src={xrpLogo} alt="logo" h="18px" />
            <Text fontSize="xs">1.00</Text>
          </HStack>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Signature" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">soft boy</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Transaction Type" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">Payment Transaction</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Result" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">jonbak@gmail.com</Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ListTxnsEditables;
