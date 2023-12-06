import { HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";

export interface TokenItemProps {
  token: string;
  issuer: string;
  icon: string;
  amount: number | string;
}

function TokenItem({ token, issuer, icon, amount }: TokenItemProps) {
  return (
    <HStack bg="dark" borderRadius="10px" h="100%" pl={3} pr={1}>
      <Image src={icon} alt="" h="65%" />
      <VStack spacing={0} align="flex-start">
        <Text className="font-face-proxima-nova-extrabld" fontSize="3vh" textTransform="uppercase">
          {token}
        </Text>
        <Text fontSize="xs" mt="-2px">
          {issuer}
        </Text>
      </VStack>
      <Spacer />
      <Text fontSize="4vh" mt={-4} pr={2} pos="absolute" right={0}>
        {Number(amount).toFixed(2)}
      </Text>
    </HStack>
  );
}

export default TokenItem;
