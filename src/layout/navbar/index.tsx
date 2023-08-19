import { HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";

function Navbar() {
  return (
    <HStack h="100%">
      <HStack borderRight="1px solid #686666" pr={8}>
        <Image src={xrpLogo} alt="xrp" h="40px" />
        <Text fontWeight="bold" letterSpacing={1}>
          XRP
        </Text>
      </HStack>
    </HStack>
  );
}

export default Navbar;
