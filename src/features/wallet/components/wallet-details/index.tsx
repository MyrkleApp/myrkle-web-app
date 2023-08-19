import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import ChecksIcon from "@/icons/checks";
import HourGlassIcon from "@/icons/hour-glass";
import AccountDetailButton from "../account-detail-button";
import ExchangeIcon from "@/icons/exchange";
import ArrowUpIcon from "@/icons/arrow-up";
import ArrowDownIcon from "@/icons/arrow-down";

const actionLinks = [
  { text: "Check", icon: ChecksIcon },
  { text: "Escrow", icon: HourGlassIcon },
  { text: "Send", icon: ArrowUpIcon },
  { text: "Receive", icon: ArrowDownIcon },
  { text: "Exchange", icon: ExchangeIcon },
];

function WalletDetails() {
  return (
    <Flex h="200px" bg="dark" borderRadius="25px" align="center">
      <Flex align="center" justify="center" width="250px" h="200px">
        <Image src={xrpLogo} alt="" h="140px" />
      </Flex>

      <Flex direction="column" justify="space-between" py={5} h="100%">
        <HStack spacing={5}>
          <Text color="textDark" fontSize="sm" fontWeight="bold">
            Welcome
          </Text>
          <Text color="textDark" fontSize="sm" fontWeight="bold">
            AHFBUSKEBVDUSVBKFJWEFWBUG,DV746234H4UIERHOOF
          </Text>
        </HStack>

        <Box mt="-15px">
          <Text color="#d5d6d4" fontSize="5xl" fontWeight="bold">
            5,234.9
          </Text>
          <Text color="textDark" fontSize="xs" fontWeight="bold" mt={-2}>
            $600,043.89
          </Text>
        </Box>

        <HStack spacing={3}>
          {actionLinks.map((actionLink, i) => (
            <AccountDetailButton key={i} text={actionLink.text} icon={actionLink.icon} />
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
}

export default WalletDetails;
