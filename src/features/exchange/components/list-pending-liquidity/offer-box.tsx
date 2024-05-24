import ItemLabel from "@/components/item-label";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { ellipsisAtCenter, formatNumber, isXrpToken } from "@/helpers";
import TokenIcon from "@/features/shared/components/token-icon";
import HoverDetail from "@/components/hover-detail";

export interface OfferBoxProps {
  token: string;
  issuer: string;
  amount: string | number;
  icon?: string;
}

function OfferBox({ token, issuer, amount }: OfferBoxProps) {
  return (
    <Box w="50%" bg="darkest" borderRadius="5px" p="3px 8px 25px 7px">
      <ItemLabel title="Give" mb={2} />
      <HStack>
        <TokenIcon token={token} issuer={issuer} h="40px" />
        <VStack spacing={0} align="flex-start" mt="7px">
          <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
            {token}
          </Text>
          {!isXrpToken({ token }) && (
            <Text fontSize="xs" mt="-2px">
              {ellipsisAtCenter(issuer || "-- --")}
            </Text>
          )}
        </VStack>
        <Spacer />
        <Text
          fontWeight="bold"
          fontSize="2xl"
          w="calc(100% - 100px)"
          textAlign="right"
          pos="relative"
          _hover={{
            "#hover-detail": {
              display: "block",
            },
          }}
        >
          <HoverDetail text={formatNumber(amount)} />
          {ellipsisAtCenter(formatNumber(amount), 8, true)}
        </Text>
      </HStack>
    </Box>
  );
}

export default OfferBox;
