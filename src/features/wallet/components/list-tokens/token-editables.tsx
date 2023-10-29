import EditableElement from "@/components/editable-element";
import ItemLabel from "@/components/item-label";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectNetwork } from "../../redux/wallet.selectors";

export interface TokenEditablesProps {
  data: any;
  limit?: string;
}

function TokenEditables({ data, limit }: TokenEditablesProps) {
  const network = useSelector(selectNetwork);

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
          <Text fontSize="xs" ml={5}>
            -- --
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Transfer fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <EditableElement value="-- --" />
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Limit" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" letterSpacing={2} ml={5}>
            {limit}
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
            {network === "mainnet" ? data?.supply : "-- --"}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Sequence" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" ml={5}>
            -- --
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Email" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <EditableElement value="-- --" />
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Domain" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <EditableElement value="-- --" />
        </Box>
      </Flex>
    </Flex>
  );
}

export default TokenEditables;
