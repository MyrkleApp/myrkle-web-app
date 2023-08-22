import { Circle, Flex, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import ChecksIcon from "@/icons/checks";
import HourGlassIcon from "@/icons/hour-glass";
import ArrowUpIcon from "@/icons/arrow-up";
import ArrowDownIcon from "@/icons/arrow-down";
import ExchangeIcon from "@/icons/exchange";

function TokenCard() {
  return (
    <HStack h="75px" bg="dark" borderRadius="25px" mb={2} px={5} cursor="pointer">
      <Flex justify="space-between" align="center" w="100%">
        <HStack>
          <Image src={xrpLogo} alt="" />
          <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
            usd
          </Text>
        </HStack>

        <Text fontSize="xs">WRUEI23...093T0G38</Text>

        <Text fontSize="xs" fontWeight="bold" color="success">
          +0.02%
        </Text>

        <VStack spacing={0}>
          <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
            234.9
          </Text>
          <Text color="textDark" fontSize="xs" fontWeight="bold">
            $600,043.89
          </Text>
        </VStack>
      </Flex>

      <Spacer />

      <HStack borderLeft="1px solid #353535" pl={4} spacing={3}>
        <Circle bg="secondary" size="40px">
          <ChecksIcon stroke="textDark" fontSize="sm" />
        </Circle>
        <Circle bg="secondary" size="40px">
          <HourGlassIcon color="textDark" fill="textDark" fontSize="sm" />
        </Circle>
        <Circle bg="secondary" size="40px">
          <ArrowUpIcon stroke="textDark" fontSize="sm" />
        </Circle>
        <Circle bg="secondary" size="40px">
          <ArrowDownIcon stroke="textDark" fontSize="sm" />
        </Circle>
        <Circle bg="secondary" size="40px">
          <ExchangeIcon stroke="textDark" fill="none" fontSize="sm" />
        </Circle>
      </HStack>
    </HStack>
  );
}

export default TokenCard;
