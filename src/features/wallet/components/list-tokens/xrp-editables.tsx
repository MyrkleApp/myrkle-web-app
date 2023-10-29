import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import useGetXrpData from "../../hooks/use-get-xrp-data";
import { formatNumber } from "@/helpers";
import xrpLogo from "@/assets/xrp-logo.svg";

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
          <Text fontSize="xs" letterSpacing={1} ml={3}>
            ${formatNumber(data.marketCap?.data)}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Market dominance" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" letterSpacing={1} ml={3}>
            {data.marketDominance?.data} %
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Transfer fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <HStack ml={3}>
            <Image src={xrpLogo} alt="xrp" h="20px" />
            <Text fontSize="xs" letterSpacing={1}>
              {data.fee?.data}
            </Text>
          </HStack>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Max supply" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <HStack ml={3}>
            <Image src={xrpLogo} alt="xrp" h="20px" />
            <Text fontSize="xs" letterSpacing={1}>
              {formatNumber(data.maxSupply?.data)}
            </Text>
          </HStack>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Circulating supply" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <HStack ml={3}>
            <Image src={xrpLogo} alt="xrp" h="20px" />
            <Text fontSize="xs" letterSpacing={1}>
              {formatNumber(data.circulatingSupply?.data)}
            </Text>
          </HStack>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Burned coins" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <HStack ml={3}>
            <Image src={xrpLogo} alt="xrp" h="20px" />
            <Text fontSize="xs" letterSpacing={1}>
              {formatNumber(data.burnedCoins?.data)}
            </Text>
          </HStack>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Escrowed coins" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <HStack ml={3}>
            <Image src={xrpLogo} alt="xrp" h="20px" />
            <Text fontSize="xs" letterSpacing={1}>
              {formatNumber(data.escrowedCoins?.data)}
            </Text>
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default XrpEditables;
