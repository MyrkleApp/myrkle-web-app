import { Box, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import Input from "@/components/input";

function ExchangeBox() {
  return (
    <Box h="100%" bg="darkest" borderRadius="13px" p={1} pb={3}>
      <HStack bg="secondary" borderRadius="10px" h="calc(100% - 15px)" mb={1} pl={3} pr={1}>
        <Image src={xrpLogo} alt="" h="55%" />
        <VStack spacing={0} align="flex-start">
          <Text className="font-face-proxima-nova-extrabld" fontSize="sm" textTransform="uppercase">
            xrpl
          </Text>
          <Text fontSize="xs" mt="-2px">
            AHFBUSKEBVDUSVBKFJAHFBUSK
          </Text>
        </VStack>
        <Spacer />
        <Input value="0.00" fontSize="2xl" textAlign="right" w="30%" />
      </HStack>
      <Text fontSize="xs" px={3}>
        Balance: 0
      </Text>
    </Box>
  );
}

export default ExchangeBox;
