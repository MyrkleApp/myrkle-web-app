import ItemLabel from "@/components/item-label";
import { Box, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import { ellipsisAtCenter, formatNumber, isXrpToken } from "@/helpers";
import { IToken } from "@/features/shared/types";

export interface OfferBoxProps {
  token?: IToken;
  amount?: string | number;
}

function OfferBox({ token, amount }: OfferBoxProps) {
  return (
    <Box w="50%" h="100%" bg="darkest" borderRadius="5px" p="3px 8px 25px 7px">
      <ItemLabel title="Give" mb={2} />
      <HStack>
        <Image src={token?.icon || tokenPlaceholder} alt="" h="40px" />
        <VStack spacing={0} align="flex-start" mt="7px">
          <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
            xrpl
          </Text>
          {!isXrpToken(token) && (
            <Text fontSize="xs" mt="-2px">
              {ellipsisAtCenter(token?.issuer || "jjjj")}
            </Text>
          )}
        </VStack>
        <Spacer />
        <Text fontWeight="bold" fontSize="2xl">
          {formatNumber(amount || "")}
        </Text>
      </HStack>
    </Box>
  );
}

export default OfferBox;
