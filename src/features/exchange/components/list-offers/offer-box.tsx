import ItemLabel from "@/components/item-label";
import { Box, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import { ellipsisAtCenter } from "@/helpers";

function OfferBox() {
  return (
    <Box w="50%" h="100%" bg="darkest" borderRadius="5px" p="3px 7px 25px 7px" cursor="pointer">
      <ItemLabel title="Give" mb={2} />
      <HStack>
        <Image src={xrpLogo} alt="" h="40px" />
        <VStack spacing={0} align="flex-start" mt="7px">
          <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
            xrpl
          </Text>
          <Text fontSize="xs" mt="-2px">
            {ellipsisAtCenter("sfjjsfsjsfwjfejojojfwijjfojfjsljfj")}
          </Text>
        </VStack>
        <Spacer />
        <Text fontWeight="bold" fontSize="2xl">
          163.00
        </Text>
      </HStack>
    </Box>
  );
}

export default OfferBox;
