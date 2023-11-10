import { HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import { ellipsisAtCenter, formatNumber, isXrpToken } from "@/helpers";

export interface OfferBoxProps {
  token: string;
  issuer: string;
  amount: string | number;
  icon?: string;
}

function PendingOfferBox({ token, issuer, amount, icon }: OfferBoxProps) {
  return (
    <HStack w="50%" h="100%" bg="darkest" borderRadius="5px" pl={2} pr={3}>
      <Image src={isXrpToken({ token }) ? xrpLogo : icon || tokenPlaceholder} alt="" h="30px" />
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
