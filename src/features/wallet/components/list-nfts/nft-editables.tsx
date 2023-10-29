import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

function NftEditables() {
  const [searchParams] = useSearchParams();
  const serial = searchParams.get("serial") || "-- --";
  const taxon = searchParams.get("taxon") || "-- --";
  const issuer = searchParams.get("issuer") || "-- --";
  const fee = searchParams.get("fee") || "-- --";

  return (
    <Box w="calc(100% - 40px)" h="calc(100% - 40px)" mt="20px" mx="auto" overflow="auto" pr={3}>
      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Serial" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">{serial}</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Issuer" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">{issuer}</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Taxon" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">{taxon}</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Owner" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">-- --</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="URL" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">-- --</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Transfer fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">{fee}%</Text>
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
