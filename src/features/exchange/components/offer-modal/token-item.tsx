import { HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";

function TokenItem() {
  return (
    <HStack bg="dark" borderRadius="10px" h="100%" pl={3} pr={1}>
      <Image src={xrpLogo} alt="" h="55%" />
      <VStack spacing={0} align="flex-start">
        <Text className="font-face-proxima-nova-extrabld" fontSize="md" textTransform="uppercase">
          xrpl
        </Text>
        <Text fontSize="xs" mt="-2px">
          AHFBUSKEBVDUSVBKFJAHFBUSK
        </Text>
      </VStack>
      <Spacer />
      <Text fontSize="2xl" mt={-4} pr={2} pos="absolute" right={0}>
        163.00
      </Text>
    </HStack>
  );
}

export default TokenItem;
