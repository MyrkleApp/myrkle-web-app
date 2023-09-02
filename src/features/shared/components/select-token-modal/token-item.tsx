import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";

function TokenItem() {
  return (
    <HStack cursor="pointer" mb={5}>
      <Image src={xrpLogo} alt="" h="40px" />
      <VStack spacing={0} align="flex-start" ml={2}>
        <Text fontSize="sm" textTransform="uppercase">
          xrp
        </Text>
        <Text fontSize="xs" color="#5a5858">
          issuer
        </Text>
      </VStack>
    </HStack>
  );
}

export default TokenItem;
