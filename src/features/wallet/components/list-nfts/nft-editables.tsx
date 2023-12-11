import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { selectAddress } from "../../redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useParseNftFlagQuery } from "@/features/shared/redux/xrp.api";
import Skeleton1 from "@/components/skeleton";

function NftEditables() {
  const [searchParams] = useSearchParams();
  const serial = searchParams.get("serial") || "-- --";
  const taxon = searchParams.get("taxon") || "-- --";
  const issuer = searchParams.get("issuer") || "-- --";
  const fee = searchParams.get("fee") || "-- --";
  const flag = searchParams.get("flag") || "";
  const uri = searchParams.get("uri") || "-- --";

  const { data: flagData, isLoading: isFlagDataLoading } = useParseNftFlagQuery(flag);

  const address = useSelector(selectAddress);

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
          <Text fontSize="xs">{address}</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="URI" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">{uri}</Text>
        </Box>
      </Flex>

      <Flex justify="space-between" mb={2}>
        <Box w="30%">
          <ItemLabel title="Royalties" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs">{fee}%</Text>
        </Box>
      </Flex>

      <RenderFlags isLoading={isFlagDataLoading}>
        {flagData?.map((flag: any, index: number) => (
          <Flex key={index} justify="space-between" mb={2}>
            <Box w="30%">{index === 0 && <ItemLabel title="Flags" fontWeight="400" mb={0} />}</Box>
            <Box w="57%">
              <HStack>
                <Text fontSize="xs" fontWeight="bold" color="textDark">
                  {flag?.flagname}
                </Text>
                <Spacer />
              </HStack>
              <Text fontSize="2xs" color="textDark">
                {flag?.description}
              </Text>
            </Box>
          </Flex>
        ))}
      </RenderFlags>
    </Box>
  );
}

const RenderFlags = ({ children, isLoading }: any) => {
  if (isLoading) {
    return (
      <Flex direction="column" align="flex-end">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <Box key={i} mb={4} w="57%">
              <Skeleton1 h="15px" borderRadius="0" mb={3} />
              <Skeleton1 h="45px" borderRadius="0" />
            </Box>
          ))}
      </Flex>
    );
  }

  return <>{children}</>;
};

export default NftEditables;
