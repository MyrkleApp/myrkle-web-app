import ItemLabel from "@/components/item-label";
import { Box, Flex, Text } from "@chakra-ui/react";
import useGetXrpData from "../../hooks/use-get-xrp-data";

export interface XrpEditablesProps {
  data: ReturnType<typeof useGetXrpData>;
}

function XrpEditables({ data }: XrpEditablesProps) {
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
          <Text fontSize="xs" letterSpacing={2} ml={5}>
            {data.marketCap?.data}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Transfer fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" letterSpacing={2} ml={5}>
            {data.fee?.data}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Limit" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" letterSpacing={2} ml={5}>
            -- --
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Max supply" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" letterSpacing={2} ml={5}>
            {data.maxSupply?.data}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Circulating supply" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" letterSpacing={2} ml={5}>
            {data.circulatingSupply?.data}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Burned coins" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" letterSpacing={2} ml={5}>
            {data.burnedCoins?.data}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Escrowed coins" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" letterSpacing={2} ml={5}>
            {data.escrowedCoins?.data}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default XrpEditables;
