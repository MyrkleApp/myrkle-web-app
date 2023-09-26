import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Spacer, Switch, Text } from "@chakra-ui/react";

function NftEditables() {
  return (
    <Box w="calc(100% - 40px)" h="calc(100% - 40px)" mt="20px" mx="auto" overflow="auto" pr={3}>
      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Serial" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">15</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Issuer" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">BIU009RTONEOWJEWOSWOOE38599</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Taxon" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">16</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Owner" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">500</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Sequence" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" letterSpacing={2}>
            123456
          </Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="URL" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">www.google.com</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Transfer fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">15%</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Flags" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <HStack>
            <Text fontSize="xs" fontWeight="bold" color="textDark">
              tfBurnable
            </Text>
            <Spacer />
            <Switch size="sm" colorScheme="whatsapp" />
          </HStack>
          <Text fontSize="2xs" color="textDark">
            Allow the issuer (or the entity authorized by the issuer) to destroy the minted NFToken.
            (The NFTokens owner can always do so.)
          </Text>
        </Box>
      </Flex>

      <Flex justify="flex-end" mb={2}>
        <Box w="57%">
          <HStack>
            <Text fontSize="xs" fontWeight="bold" color="textDark">
              tfOnlyXRP
            </Text>
            <Spacer />
            <Switch size="sm" colorScheme="whatsapp" />
          </HStack>
          <Text fontSize="2xs" color="textDark">
            The minted NFToken can only be bought or sold for XRP. This can be desirable if the
            token has a transfer fee and the issuer does not want to receive fees in non-XRP
            currencies.
          </Text>
        </Box>
      </Flex>

      <Flex justify="flex-end" mb={2}>
        <Box w="57%">
          <HStack>
            <Text fontSize="xs" fontWeight="bold" color="textDark">
              tfTransferable
            </Text>
            <Spacer />
            <Switch size="sm" colorScheme="whatsapp" />
          </HStack>
          <Text fontSize="2xs" color="textDark">
            The minted NFToken can be transferred to others. If this flag is not enabled, the token
            can still be transferred from or to the issuer.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default NftEditables;
