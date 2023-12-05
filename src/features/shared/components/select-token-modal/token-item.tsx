import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import TokenIcon from "../token-icon";

export interface TokenItemProps {
  token: string;
  issuer: string;
  icon: string;
  handleClick: () => void;
  isMyToken?: boolean;
}

function TokenItem({ token, issuer, icon, handleClick, isMyToken }: TokenItemProps) {
  return (
    <HStack cursor="pointer" mb={5} onClick={handleClick}>
      {isMyToken ? (
        <TokenIcon token={token} issuer={issuer} h="40px" borderRadius="50%" />
      ) : (
        <Image src={icon || tokenPlaceholder} alt="" h="40px" borderRadius="50%" />
      )}
      <VStack spacing={0} align="flex-start" ml={2}>
        <Text fontSize="sm" textTransform="uppercase">
          {token}
        </Text>
        <Text fontSize="xs" color="#5a5858">
          {issuer}
        </Text>
      </VStack>
    </HStack>
  );
}

export default TokenItem;
