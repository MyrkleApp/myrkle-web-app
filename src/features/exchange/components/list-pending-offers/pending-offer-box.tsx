import { HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import { ellipsisAtCenter } from "@/helpers";

function PendingOfferBox() {
  return (
    <HStack w="50%" h="100%" bg="darkest" borderRadius="5px" pl={2} pr={3}>
      <Image src={xrpLogo} alt="" h="30px" />
      <VStack spacing={0} align="flex-start">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
          xrpl
        </Text>
        <Text fontSize="xs" mt="-2px">
          {ellipsisAtCenter("sfjjsfsjsfwjfejojojfwijjfojfjsljfj")}
        </Text>
      </VStack>
      <Spacer />
      <Text fontWeight="bold" fontSize="lg">
        157.00
      </Text>
    </HStack>
  );
}

export default PendingOfferBox;
