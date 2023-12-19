import { HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { ellipsisAtCenter, formatNumber } from "@/helpers";
import TokenIcon from "@/features/shared/components/token-icon";

export interface OfferBoxProps {
  token: string;
  issuer: string;
  amount: string | number;
  icon?: string;
}

function PendingOfferBox({ token, issuer, amount }: OfferBoxProps) {
  return (
    <HStack w="50%" h="100%" bg="darkest" borderRadius="5px" pl={2} pr={3}>
      <TokenIcon token={token} issuer={issuer} h="30px" />
      <VStack spacing={0} align="flex-start">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
          {token}
        </Text>
        <Text fontSize="xs" mt="-2px">
          {ellipsisAtCenter(issuer)}
        </Text>
      </VStack>
      <Spacer />
      <Text fontWeight="bold" fontSize="lg">
        {formatNumber(amount || "")}
      </Text>
    </HStack>
  );
}

export default PendingOfferBox;
