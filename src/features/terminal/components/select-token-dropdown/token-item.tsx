import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";

export interface TokenItemProps {
  token?: any;
  handleClick?: (value: any) => void;
}

function TokenItem({ token, handleClick }: TokenItemProps) {
  return (
    <HStack h="50px" borderRadius="7px" bg="gray" px={2} mb={2} onClick={handleClick}>
      <Image src={xrpLogo} alt="" h="35px" />
      <VStack align="flex-start" spacing={0}>
        <Text fontSize="xs" fontWeight="bold">
          {token?.token}
        </Text>
        <Text fontSize="2xs">{token?.issuer}</Text>
      </VStack>
    </HStack>
  );
}

export default TokenItem;
