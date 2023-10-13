import { HStack, Image, Text, VStack } from "@chakra-ui/react";

export interface TokenItemProps {
  token: string;
  issuer: string;
  icon: string;
  handleClick: () => void;
}

function TokenItem({ token, issuer, icon, handleClick }: TokenItemProps) {
  return (
    <HStack cursor="pointer" mb={5} onClick={handleClick}>
      <Image src={icon} alt="" h="40px" />
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
