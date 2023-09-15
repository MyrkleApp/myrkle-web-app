import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";

export interface TokenItemProps {
  handleClick?: () => void;
}

function TokenItem({ handleClick }: TokenItemProps) {
  return (
    <HStack h="50px" borderRadius="7px" bg="gray" px={2} mb={2} onClick={handleClick}>
      <Image src={xrpLogo} alt="" h="35px" />
      <VStack align="flex-start" spacing={0}>
        <Text fontSize="xs" fontWeight="bold">
          XRP
        </Text>
        <Text fontSize="2xs">h279uwjrw98y3r3h923929jd22</Text>
      </VStack>
    </HStack>
  );
}

export default TokenItem;
