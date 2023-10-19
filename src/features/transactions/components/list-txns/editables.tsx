import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";

export interface ListTxnsEditables {
  txn: any;
}

function ListTxnsEditables({ txn }: ListTxnsEditables) {
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
          <Text fontSize="xs">-- --</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Date" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">{txn?.timestamp.split(" ")[0]}</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Time" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">{txn?.timestamp.split(" ")[1]}</Text>
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
            <Text fontSize="xs">{txn?.fee}</Text>
          </HStack>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Signature" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">-- --</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Transaction Type" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">{txn?.tx_type}</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Result" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">{txn?.result}</Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ListTxnsEditables;
